import { MainLayout } from '@/components/layout'
import { WorkForm } from '@/components/work'
import { useAddWork, useWorkDetails } from '@/hooks'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { toast } from 'react-toastify'

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
	const router = useRouter()
	const { workId } = router.query
	const isAddMode = workId === 'add'

	const {
		data: workDetails,
		isLoading,
		updateWork,
	} = useWorkDetails({
		workId: (workId as string) || '',
		enabled: router.isReady && !isAddMode,
	})

	const addNewWork = useAddWork()

	console.log({ workDetails, isLoading })

	async function handleSubmit(payload: FormData) {
		try {
			let newWork = null
			if (isAddMode) {
				newWork = await addNewWork(payload)
				toast.success(`add work successfully, ${newWork?.id}`)
			} else {
				newWork = await updateWork(payload)
				toast.success('update work successfully')
			}

			// navigate to details page - required ID = newWork.id
			router.push(`/works/${newWork?.id}/details`)
		} catch (error) {
			console.log(error)
		}
	}

	if (!router.isReady) return null

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
						<WorkForm initialValues={workDetails} onSubmit={handleSubmit} />
					)}
				</Box>
			</Container>

			<Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
		</Box>
	)
}

AddEditWorkPage.Layout = MainLayout
AddEditWorkPage.requireLogin = true
