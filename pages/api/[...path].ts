// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
// 	name: string
// }

const proxy = httpProxy.createProxyServer()

export const config = {
	api: {
		bodyParser: false,
	},
	proxy: true,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise((resolve, reject) => {
		const isLogin = req.url?.startsWith('/api/login')
		console.log({ isLogin })

		// Convert cookies to Authorization header
		const cookies = new Cookies(req, res)
		const accessToken = cookies.get('access_token')
		if (accessToken) {
			req.headers.Authorization = `Bearer ${accessToken}`
		}

		// don't forward cookies to API server
		req.headers.cookie = ''

		const handleLoginResponse: ProxyResCallback = (proxyResponse, req, res) => {
			console.log('proxy response in')
			if (!isLogin) return resolve(true)

			let apiResponseBody = ''
			proxyResponse.on('data', (chunk) => {
				apiResponseBody += chunk
			})

			proxyResponse.on('end', () => {
				try {
					// Extract the authToken from API's response:
					console.log({ apiResponseBody })
					const { accessToken, expiredAt } = JSON.parse(apiResponseBody)
					// Set the authToken as an HTTP-only cookie.
					// We'll also set the SameSite attribute to
					// 'lax' for some additional CSRF protection.
					const cookies = new Cookies(req, res)
					cookies.set('access_token', accessToken, {
						httpOnly: true,
						secure: true,
						sameSite: 'lax',
						expires: new Date(expiredAt),
					})

					// Our response to the client won't contain
					// the actual authToken. This way the auth token
					// never gets exposed to the client.
					;(res as NextApiResponse).json({ message: true })
					resolve({})
				} catch (error) {
					console.log('parse token error', error)
					reject(new Error('something went wrong'))
				}
			})
		}

		// handle login response manually
		if (isLogin) {
			proxy.once('proxyRes', handleLoginResponse)
		}

		proxy.once('error', reject)

		proxy.web(req, res, {
			target: 'https://js-post-api.herokuapp.com',
			autoRewrite: false,
			changeOrigin: true,
			selfHandleResponse: isLogin,
		})
	})
}
