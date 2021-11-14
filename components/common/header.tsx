import * as React from 'react'
import { Box, Container, Stack, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface HeaderProps {}

const ROUTE_LIST = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Works',
		path: '/works',
	},
	{
		label: 'Blog',
		path: '/blog',
	},
]

export default function Header(props: HeaderProps) {
	const router = useRouter()

	return (
		<Box p={2} component="header">
			<Container>
				<Stack direction="row">
					<Box flexGrow={1}>&nbsp;</Box>

					<Box>
						{ROUTE_LIST.map((route) => (
							<Link key={route.path} href={route.path} passHref>
								<MuiLink sx={{ mr: 1 }} className={router.pathname === route.path ? 'active' : ''}>
									{route.label}
								</MuiLink>
							</Link>
						))}
					</Box>
				</Stack>
			</Container>
		</Box>
	)
}
