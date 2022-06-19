import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
import { getPostList } from '@/utils/posts'
export interface BlogListPageProps {
	posts: any[]
}

export default function BlogListPage({ posts }: BlogListPageProps) {
	console.log('posts', posts)

	return (
		<div>
			<h1>Blog List Page</h1>

			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/posts/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
	// convert markdown files into list of javascript objects
	const postList = await getPostList()

	return {
		props: {
			posts: postList,
		},
	}
}
