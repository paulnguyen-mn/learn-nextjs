import { useAuth } from '@/hooks/index'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface AuthProps {
	children: any
}

export function Auth({ children }: AuthProps) {
	const { profile, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && !profile?.username) {
			router.push('/login')
		}
	}, [profile, loading, router])

	if (!profile?.username) return <p>Loading...</p>

	return (
		<div>
			{profile && <p>{JSON.stringify(profile, null, 2)}</p>}
			{children}
		</div>
	)
}
