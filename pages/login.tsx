import Header from '@/components/common/header'
import { AdminLayout } from '@/components/layout'
import authApi from 'api-client/authApi'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export default function LoginPage() {
	const router = useRouter()
	const [profile, setProfile] = useState(null)

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
			try {
				await authApi.logout()
			} catch (error) {
				console.log('failed to logout', error)
			}
		} catch (error) {}
	}

	async function handleLoginClick() {
		try {
			await authApi.login({
				username: 'test1',
				password: '123123',
			})
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	return (
		<div>
			<h1>Login Page</h1>

			<button onClick={handleLoginClick}>Login</button>
			<button onClick={handleGetProfileClick}>Get profile</button>
			<button onClick={handleLogoutClick}>Logout</button>
		</div>
	)
}