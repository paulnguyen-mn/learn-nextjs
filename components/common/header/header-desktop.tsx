import { Container, Link as MuiLink, Stack } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { ROUTE_LIST } from './routes'
import clsx from 'clsx'
import { useAuth } from '@/hooks'

export function HeaderDesktop() {
	const router = useRouter()
	const { profile, logout } = useAuth()
	const isLoggedIn = Boolean(profile?.username)
	const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)

	return (
		<Box display={{ xs: 'none', md: 'block' }} py={2}>
			<Container>
				<Stack direction="row" justifyContent="flex-end">
					{routeList.map((route) => (
						<Link key={route.path} href={route.path} passHref>
							<MuiLink
								sx={{ ml: 2, fontWeight: 'medium' }}
								className={clsx({ active: router.pathname === route.path })}
							>
								{route.label}
							</MuiLink>
						</Link>
					))}

					{!isLoggedIn && (
						<Link href="/login" passHref>
							<MuiLink sx={{ ml: 2, fontWeight: 'medium' }}>Login</MuiLink>
						</Link>
					)}

					{isLoggedIn && (
						<MuiLink sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }} onClick={logout}>
							Logout
						</MuiLink>
					)}
				</Stack>
			</Container>
		</Box>
	)
}
