import { Box } from '@mui/system'
import * as React from 'react'

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
	return <Box display={{ xs: 'block', md: 'none' }}>Header Mobile</Box>
}
