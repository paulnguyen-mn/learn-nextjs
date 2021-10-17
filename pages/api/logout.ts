// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	success: boolean
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(req.method)
	if (req.method !== 'POST') {
		return res.status(404).json({ success: false })
	}

	// ignore cookie value means to delete it
	const cookies = new Cookies(req, res)
	cookies.set('access_token')

	res.status(200).json({ success: true })
}
