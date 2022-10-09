import React from 'react'
import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

export default function LoginPage() {
	const router = useRouter()
	const { login } = useAuth({
		revalidateOnMount: false,
	})

	async function handleLoginSubmit(payload: LoginPayload) {
		try {
			await login(payload)
			router.push('/')
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	return (
		<Box>
			<Paper
				elevation={4}
				sx={{
					mx: 'auto',
					mt: 8,
					p: 4,
					maxWidth: '480px',
					textAlign: 'center',
				}}
			>
				<Typography component="h1" variant="h5" mb={3}>
					Easy Frontend - Login
				</Typography>

				<LoginForm onSubmit={handleLoginSubmit} />
			</Paper>
		</Box>
	)
}
