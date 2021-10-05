import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

export interface ParamsPageProps {
	query: any
	post: any
}

export default function ParamsPage({ query, post }: ParamsPageProps) {
	const router = useRouter()
	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((x) => {
				if (x > 60) clearInterval(intervalId)

				return x + 1
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div>
			<h1>Params Page</h1>

			<p>Time: {seconds}s</p>

			<h2>Post detail</h2>
			<p>{post?.title}</p>
			<p>{post?.author}</p>
			<p>{post?.description}</p>
		</div>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5')

	await new Promise((res) => setTimeout(res, 3000))

	const postId = context.query.postId
	if (!postId) return { props: { query: context.query } }

	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
	const data = await response.json()

	return {
		props: {
			query: context.query,
			post: data,
		},
	}
}
