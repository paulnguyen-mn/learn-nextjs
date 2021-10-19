import { useAuth } from '@/hooks/use-auth'
import { LayoutProps } from '@/models/index'
import Link from 'next/link'
import router from 'next/router'
import * as React from 'react'
import { Auth } from '../common/auth'

export function AdminLayout({ children }: LayoutProps) {
	const { logout } = useAuth()

	async function handleLogout() {
		try {
			await logout()
			router.push('/login')
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	return (
		<Auth>
			<h1>Admin Layout</h1>
			<div>Sidebar</div>

			<Link href="/">
				<a>Home</a>
			</Link>

			<Link href="/about">
				<a>About</a>
			</Link>

			<button onClick={handleLogout}>Logout</button>

			<div>{children}</div>
		</Auth>
	)
}
