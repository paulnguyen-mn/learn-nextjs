import { MainLayout } from '@/components/layout'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
	const router = useRouter()
	const { workId } = router.query
	const isAddMode = workId === 'add'

	console.log({ workId, isAddMode, ready: router.isReady })

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
			</Container>
		</Box>
	)
}

AddEditWorkPage.Layout = MainLayout
