import { MainLayout } from '@/components/layout'
import { useAuth } from '@/hooks'
import { Work } from '@/models'
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import sanitizeHtml from 'sanitize-html'

export interface WorkDetailsPageProps {
	work: Work
}

export default function WorkDetailsPage({ work }: WorkDetailsPageProps) {
	const router = useRouter()
	const { isLoggedIn } = useAuth()

	if (router.isFallback) {
		return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>
	}

	if (!work) return null

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						{work.title}
					</Typography>

					{isLoggedIn && (
						<Button variant="contained" onClick={() => router.push(`/works/${work.id}`)}>
							Edit
						</Button>
					)}
				</Stack>

				<Stack direction="row" my={2}>
					<Chip
						color="primary"
						label={new Date(Number.parseInt(work.createdAt)).getFullYear()}
						size="small"
					/>

					<Typography ml={3} color="GrayText">
						{work.tagList.join(', ')}
					</Typography>
				</Stack>

				<Typography>{work.shortDescription}</Typography>

				<Box
					component="div"
					dangerouslySetInnerHTML={{ __html: work.fullDescription }}
					sx={{
						img: {
							maxWidth: '100%',
						},
					}}
				></Box>
			</Container>
		</Box>
	)
}

WorkDetailsPage.Layout = MainLayout

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`${process.env.API_URL}/api/works?_page=1&_limit=3`)
	const data = await response.json()

	return {
		paths: data.data.map((work: any) => ({ params: { workId: work.id } })),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<WorkDetailsPageProps> = async (
	context: GetStaticPropsContext
) => {
	const workId = context.params?.workId
	if (!workId) return { notFound: true }

	const response = await fetch(`${process.env.API_URL}/api/works/${workId}`)
	const data = await response.json()

	// sanitize HTML
	data.fullDescription = sanitizeHtml(data.fullDescription, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
	})

	return {
		props: {
			work: data,
		},
		revalidate: 300, // 300s = 5m
	}
}
