import { Post } from '@/models'
import { getPostList } from '@/utils/posts'
import { Container } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify/lib'
import remarkParse from 'remark-parse/lib'
import remarkPrism from 'remark-prism'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import { unified } from 'unified'
import Script from 'next/script'
import { Box } from '@mui/material'
import { Seo } from '@/components/common'

export interface BlogPageProps {
	post: Post
}

export default function PostDetailPage({ post }: BlogPageProps) {
	if (!post) return null

	return (
		<Box>
			<Seo
				data={{
					title: `${post.title} | Easy Frontend Blog`,
					description: post.description,
					url: `${process.env.HOST_URL}/blog/${post.slug}`,
					thumbnailUrl:
						post.thumbnailUrl ||
						'https://cdn.getshifter.co/caa65008efb706a8bfc6f7e4045d6a018420c3df/uploads/2020/11/nextjs.png',
				}}
			/>

			<Container>
				<p>{post.title}</p>
				<p>{post.author?.name}</p>
				<p>{post.description}</p>
				<div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
			</Container>

			<Script src="/prism.js" strategy="afterInteractive"></Script>
		</Box>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const postList = await getPostList()

	return {
		paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
	context: GetStaticPropsContext
) => {
	const postList = await getPostList()
	const slug = context.params?.slug
	if (!slug) return { notFound: true }

	const post = postList.find((x) => x.slug === slug)
	if (!post) return { notFound: true }

	// parse md to html
	const file = await unified()
		.use(remarkParse)
		.use(remarkToc, { heading: 'agenda.*' })
		.use(remarkPrism)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypeDocument, { title: 'Blog details page' })
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(post.mdContent || '')
	post.htmlContent = file.toString()

	return {
		props: {
			post,
		},
	}
}
