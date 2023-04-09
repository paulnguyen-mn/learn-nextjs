import { MainLayout } from '@/components/layout'
import { WorkList } from '@/components/work'
import { WorkFilters } from '@/components/work/work-filters'
import { useWorkList } from '@/hooks'
import { ListParams, WorkFiltersPayload } from '@/models'
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
	const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 3 })
	const { data, isLoading } = useWorkList({ params: filters })

	const { _limit, _totalRows, _page } = data?.pagination || {}
	const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			_page: value,
		}))
	}

	function handleFiltersChange(newFilters: WorkFiltersPayload) {
		console.log('PAGE-LEVEL receive form data', newFilters)
		setFilters((prevFilters) => ({
			...prevFilters,
			_page: 1,
			title_like: newFilters.search,
		}))
	}

	return (
		<Box>
			<Container>
				<Box mb={4} mt={8}>
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work
					</Typography>
				</Box>

				<WorkFilters onSubmit={handleFiltersChange} />
				<WorkList workList={data?.data || []} loading={isLoading} />

				{totalPages > 0 && (
					<Stack alignItems="center">
						<Pagination count={totalPages} page={_page} onChange={handlePageChange}></Pagination>
					</Stack>
				)}
			</Container>
		</Box>
	)
}

WorksPage.Layout = MainLayout

export async function getStaticProps() {
	console.log('get static props')
	// const workList = await workA

	return {
		props: {},
	}
}

// browser: http://localhost:3000/api/works
// Next server: /api/works --> proxy to https://js-post-api.herokuapp.com/api/works
// API server: https://js-post-api.herokuapp.com/api/works
