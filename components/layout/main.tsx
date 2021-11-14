import { LayoutProps } from '@/models/index'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Link as MuiLink, Box, Stack } from '@mui/material'
import Header from '../common/header'

export function MainLayout({ children }: LayoutProps) {
	useEffect(() => {
		console.log('MainLayout mounting')

		return () => console.log('MainLayout unmounting')
	}, [])

	return (
		<Stack sx={{ minHeight: '100vh' }}>
			<Header />

			<Box component="main" flexGrow={1}>
				{children}
			</Box>

			<Box component="footer" p={2}>
				footer
			</Box>
		</Stack>
	)
}
