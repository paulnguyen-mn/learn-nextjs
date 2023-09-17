import { MainLayout } from '@/components/layout'
import { WorkList } from '@/components/work'
import { WorkFilters } from '@/components/work/work-filters'
import { useAuth, useWorkList } from '@/hooks'
import { ListParams, WorkFiltersPayload } from '@/models'
import { Box, Button, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
	const router = useRouter()
	const { isLoggedIn } = useAuth()
	const filters: Partial<ListParams> = {
		_page: 1,
		_limit: 3,
		...router.query,
	}
	const initFiltersPayload: WorkFiltersPayload = {
		search: filters.title_like || '',
		selectedTagList: filters.tagList_like?.split('|') || [],
	}

	const { data, isLoading } = useWorkList({ params: filters, enabled: router.isReady })
	const { _limit, _totalRows, _page } = data?.pagination || {}
	const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...filters,
					_page: value,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	function handleFiltersChange(newFilters: WorkFiltersPayload) {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...filters,
					_page: 1,
					title_like: newFilters.search,
					tagList_like: newFilters.tagList_like,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work
					</Typography>

					{isLoggedIn && (
						<Button variant="contained" onClick={() => router.push('/works/add')}>
							Add new work
						</Button>
					)}
				</Stack>

				{router.isReady ? (
					<WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
				) : (
					<Skeleton
						variant="rectangular"
						height={40}
						sx={{
							display: 'inline-block',
							width: '100%',
							mt: 2,
							mb: 1,
							verticalAlign: 'middle',
						}}
					/>
				)}

				<WorkList workList={data?.data || []} loading={!router.isReady || isLoading} />

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
