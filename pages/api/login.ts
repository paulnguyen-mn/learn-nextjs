// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'

export const config = {
	api: {
		bodyParser: false,
	},
}

type Data = {
	message: string
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method not supported' })
	}

	return new Promise((resolve) => {
		// don't forward cookie
		req.headers.cookie = ''

		const handleLoginResponse: ProxyResCallback = (proxyResponse, req, res) => {
			let apiResponseBody = ''
			proxyResponse.on('data', (chunk) => {
				apiResponseBody += chunk
			})

			proxyResponse.on('end', () => {
				try {
					// Extract the authToken from API's response:
					const { access_token, expiredAt } = JSON.parse(apiResponseBody)
					console.log({ accessToken: access_token, expiredAt })
					// Set the authToken as an HTTP-only cookie.
					// We'll also set the SameSite attribute to
					// 'lax' for some additional CSRF protection.
					const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
					cookies.set('access_token', access_token, {
						httpOnly: true,
						sameSite: 'lax',
						// secure: process.env.NODE_ENV !== 'development',
						expires: new Date(expiredAt),
					})

					// Our response to the client won't contain
					// the actual authToken. This way the auth token
					// never gets exposed to the client.
					;(res as NextApiResponse).status(200).json({ message: 'login successfully' })
				} catch (error) {
					console.log('parse token error', error)
					;(res as NextApiResponse).status(400).json({ message: 'oops, something went wrong' })
				}

				resolve(true)
			})
		}

		proxy.on('proxyRes', handleLoginResponse)
		proxy.web(req, res, {
			target: process.env.API_URL,
			autoRewrite: false,
			changeOrigin: true,
			selfHandleResponse: true,
		})
	})
}
