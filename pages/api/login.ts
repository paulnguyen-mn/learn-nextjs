// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'

type Data = {
	message: string
}

export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method not supported' })
	}

	return new Promise((resolve) => {
		// don't send cookies to API server
		req.headers.cookie = ''

		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = ''
			proxyRes.on('data', function (chunk) {
				body += chunk
			})

			proxyRes.on('end', function () {
				try {
					const isSuccess =
						proxyRes.statusCode && proxyRes.statusCode >= 200 && proxyRes.statusCode < 300
					if (!isSuccess) {
						;(res as NextApiResponse).status(proxyRes.statusCode || 500).json(body)
						return resolve(true)
					}

					const { accessToken, expiredAt } = JSON.parse(body)

					// convert token to cookies
					const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
					cookies.set('access_token', accessToken, {
						httpOnly: true,
						sameSite: 'lax',
						expires: new Date(expiredAt),
					})
					;(res as NextApiResponse).status(200).json({ message: 'login successfully' })
				} catch (error) {
					;(res as NextApiResponse).status(500).json({ message: 'something went wrong' })
				}

				resolve(true)
			})
		}

		proxy.once('proxyRes', handleLoginResponse)
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: true,
		})
	})
}
