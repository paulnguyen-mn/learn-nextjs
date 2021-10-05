import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface ParamsPageProps {}

export default function ParamsPage(props: ParamsPageProps) {
	const router = useRouter()

	return (
		<div>
			<h1>Params Page</h1>

			<p>Query: {JSON.stringify(router.query, null, 4)}</p>
		</div>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5')

	await new Promise((res) => setTimeout(res, 2500))

	return {
		props: {
			query: context.query,
		},
	}
}
