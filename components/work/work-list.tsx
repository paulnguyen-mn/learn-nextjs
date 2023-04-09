import { Work } from '@/models'
import { Box, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { WorkCard } from './work-card'
import { WorkSkeleton } from './work-skeleton'

export interface WorkListProps {
	workList: Work[]
	loading?: boolean
}

export function WorkList({ workList, loading }: WorkListProps) {
	if (loading)
		return (
			<Box>
				{Array.from({ length: 3 }).map((_, index) => (
					<Fragment key={index}>
						<WorkSkeleton />
						<Divider sx={{ my: 3 }} />
					</Fragment>
				))}
			</Box>
		)

	if (workList.length === 0)
		return (
			<Box textAlign="center" mt={8}>
				<Image
					src={
						'https://res.cloudinary.com/kimwy/image/upload/v1680947456/learn-nextjs/no-data_liu3mu.svg'
					}
					width={150}
					height={150}
					layout="fixed"
					alt="no data"
				/>

				<Typography>No data</Typography>
			</Box>
		)

	return (
		<Box>
			{workList.map((work) => (
				<Fragment key={work.id}>
					<WorkCard work={work} />
					<Divider sx={{ my: 3 }} />
				</Fragment>
			))}
		</Box>
	)
}
