import { useAuth } from '@/hooks/use-auth'
import authApi from 'api-client/auth-api'
import { useRouter } from 'next/router'
import React from 'react'
import { useSWRConfig } from 'swr'
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export default function LoginPage() {
	const router = useRouter()
	const { mutate, login } = useAuth({ revalidateOnMount: false })

	async function handleGetProfileClick() {
		try {
			try {
				await authApi.getProfile()
			} catch (error) {
				console.log('failed to get profile', error)
			}
		} catch (error) {}
	}

	async function handleLogoutClick() {
		try {
			await authApi.logout()
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	async function handleLoginClick() {
		try {
			await login()
			router.push('/about')
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	function goToAbout() {
		router.push('/about')
	}

	return (
		<div>
			<h1>Login Page</h1>

			<button onClick={handleLoginClick}>Login</button>
			<button onClick={handleGetProfileClick}>Get profile</button>
			<button onClick={goToAbout}>Go to About</button>
			<button onClick={handleLogoutClick}>Logout</button>
		</div>
	)
}
