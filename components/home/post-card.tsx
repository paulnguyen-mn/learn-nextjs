import { Card, CardContent, Typography } from '@mui/material'
import * as React from 'react'

export interface PostCardProps {}

export function PostCard(props: PostCardProps) {
	return (
		<Card>
			<CardContent>
				<Typography>Title</Typography>
				<Typography>Title</Typography>
				<Typography>Title</Typography>
				<Typography>Title</Typography>
				<Typography>Title</Typography>
				<Typography>Title</Typography>
			</CardContent>
		</Card>
	)
}
