import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface AuthProps {
	children: any
	requireLogin?: boolean
}

export function Auth({ children, requireLogin = false }: AuthProps) {
	const router = useRouter()
	const { profile, firstLoading } = useAuth()

	useEffect(() => {
		// do nothing if not require login
		if (!requireLogin) return

		if (!firstLoading && !profile?.username) router.replace('/login')
	}, [router, profile, firstLoading, requireLogin])

	if (requireLogin && !profile?.username) return <p>Loading...</p>

	return <div>{children}</div>
}
