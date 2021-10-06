import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface ParamsPageProps {}

export default function ParamsPage(props: ParamsPageProps) {
	const router = useRouter()

	return (
		<div>
			<h1>Params Page</h1>

			<p>Query: {JSON.stringify(router.query)}</p>
		</div>
	)
}

export async function getServerSideProps() {
	// fake slow query
	await new Promise((resolve) => setTimeout(resolve, 3000))

	return {
		props: {},
	}
}
