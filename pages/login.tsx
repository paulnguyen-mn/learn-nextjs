import Header from '@/components/common/header'
import { AdminLayout } from '@/components/layout'
import authApi from 'api-client/authApi'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export default function LoginPage() {
	const router = useRouter()

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
		</div>
	)
}
