import { Box } from '@mui/system'
import * as React from 'react'

export interface HeaderProps {}

export function Header(props: HeaderProps) {
	console.log('render header')

	return (
		<Box component="header" py={2} textAlign="center">
			Header
		</Box>
	)
}
