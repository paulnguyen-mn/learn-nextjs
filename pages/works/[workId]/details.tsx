import { MainLayout } from '@/components/layout'
import { Box, Container, Typography } from '@mui/material'

export default function WorkDetailsPage() {
	return (
		<Box>
			<Container>
				<Box mb={4} mt={8}>
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work Details Page
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

WorkDetailsPage.Layout = MainLayout
