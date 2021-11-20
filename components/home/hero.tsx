import { Button, Container, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import Image from 'next/image'
import avatar from '@/images/avatar.png'

export function HeroSection() {
	return (
		<Box component="section" pt={18} pb={9}>
			<Container>
				<Stack spacing={8} direction="row" alignItems="flex-start">
					<Box>
						<Typography component="h1" variant="h3" fontWeight="bold" mb={5}>
							Hi, I am John, <br />
							Creative Technologist
						</Typography>

						<Typography mb={5}>
							Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
							officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
							amet.
						</Typography>

						<Button variant="contained" size="large">
							Download Resume
						</Button>
					</Box>

					<Box
						sx={{
							minWidth: '240px',
							boxShadow: '-5px 13px',
							color: 'secondary.light',
							borderRadius: '50%',
						}}
					>
						<Image src={avatar} layout="responsive" alt="avatar" />
					</Box>
				</Stack>
			</Container>
		</Box>
	)
}

// section
//  container
//    flex-container (Stack)
//      flex-item (Box trai)
//          h1, p, button
//      flex-item (Box phai) > img
