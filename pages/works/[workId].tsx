import { MainLayout } from '@/components/layout'
import { WorkForm } from '@/components/work'
import { useWorkDetails } from '@/hooks'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
	const router = useRouter()
	const { workId } = router.query
	const isAddMode = workId === 'add'

	const { data: workDetails, isLoading } = useWorkDetails({
		workId: (workId as string) || '',
		enabled: router.isReady && !isAddMode,
	})

	console.log({ workDetails, isLoading })

	return (
		<Box>
			<Container>
				<Box mb={4} mt={8}>
					<Typography component="h1" variant="h3" fontWeight="bold">
						{isAddMode ? 'Add new work' : `Edit work #${workId}`}
					</Typography>
				</Box>

				<Box>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, veritatis totam?
					Consequatur sunt omnis maxime porro quod placeat quam eveniet asperiores! Atque soluta
					consectetur pariatur id optio, temporibus laborum facilis.
				</Box>

				<Box>
					{(isAddMode || Boolean(workDetails)) && (
						<WorkForm initialValues={workDetails} onSubmit={() => {}} />
					)}
				</Box>
			</Container>

			<Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
		</Box>
	)
}

AddEditWorkPage.Layout = MainLayout
