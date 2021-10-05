import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const router = useRouter()
	const [postList, setPostList] = useState([])

	console.log('About query: ', router.query)

	const page = router.query?._page

	useEffect(() => {
		if (!page) return
		;(async () => {
			const url = `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
			const response = await fetch(url)
			const data = await response.json()

			setPostList(data.data)
		})()
	}, [page])

	function handleChangeClick() {
		router.push(
			{
				pathname: '/about',
				query: { _page: (Number(router.query?._page) || 1) + 1 },
			},
			undefined,
			{ shallow: true }
		)
	}

	return (
		<div>
			<h1>About Page</h1>

			<ul>
				{postList.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>

			<button onClick={handleChangeClick}>next page</button>
		</div>
	)
}

export async function getStaticProps() {
	console.log('get static props about')
	return {
		props: {}, // will be passed to the page component as props
	}
}
