import { Work } from '@/models'
import { Box, Chip, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export interface WorkCardProps {
	work: Work
}

export function WorkCard({ work }: WorkCardProps) {
	return (
		<Link href={`/works/${work.id}/details`} passHref>
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ cursor: 'pointer' }}>
				<Box width={{ xs: '100%', sm: '246px' }} flexShrink={0}>
					<Image
						src={work.thumbnailUrl}
						width={246}
						height={180}
						layout="responsive"
						alt="work thumbnail"
					/>
				</Box>

				<Box>
					<Typography variant="h4" fontWeight="bold">
						{work.title}
					</Typography>

					<Stack direction="row" my={2}>
						<Chip
							color="secondary"
							label={new Date(Number.parseInt(work.createdAt)).getFullYear()}
							size="small"
						/>

						<Typography ml={3} color="GrayText">
							{work.tagList.join(', ')}
						</Typography>
					</Stack>

					<Typography>{work.shortDescription}</Typography>
				</Box>
			</Stack>
		</Link>
	)
}
