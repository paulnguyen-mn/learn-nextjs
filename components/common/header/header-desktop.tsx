import { Container, Stack, Link as MuiLink } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { ROUTE_LIST } from './routes'
import Link from 'next/link'

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
	return (
		<Box display={{ xs: 'none', md: 'block' }} py={2}>
			<Container>
				<Stack direction="row" justifyContent="flex-end">
					{ROUTE_LIST.map((route) => (
						<Link key={route.path} href={route.path} passHref>
							<MuiLink sx={{ ml: 2 }}>{route.label}</MuiLink>
						</Link>
					))}
				</Stack>
			</Container>
		</Box>
	)
}
