// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	data: Array<{
		id: string
		title: string
	}>
	pagination: {
		total: number
		page: number
		limit: number
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({
		data: [
			{
				id: '1',
				title: 'ABC',
			},
			{
				id: '2',
				title: 'DEF',
			},
		],
		pagination: {
			total: 10,
			page: 1,
			limit: 10,
		},
	})
}
