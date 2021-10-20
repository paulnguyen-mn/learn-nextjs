import { authApi } from '@/api/index'
import * as React from 'react'

export default function LoginPage() {
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

	async function handleGetProfileClick() {
		try {
			await authApi.getProfile()
		} catch (error) {
			console.log('failed to get profile', error)
		}
	}

	async function handleLogoutClick() {
		try {
			await authApi.logout()
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	return (
		<div>
			<h1>Login Page</h1>

			<button onClick={handleLoginClick}>Login</button>
			<button onClick={handleGetProfileClick}>Get Profile</button>
			<button onClick={handleLogoutClick}>Logout</button>
		</div>
	)
}
