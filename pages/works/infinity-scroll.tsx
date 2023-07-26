import { MainLayout } from '@/components/layout'
import { WorkList } from '@/components/work'
import { WorkFilters } from '@/components/work/work-filters'
import { useWorkListInfinity } from '@/hooks/use-work-list-infinity'
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models'
import { Box, Button, Container, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
	const router = useRouter()
	const filters: Partial<ListParams> = {
		...router.query,
	}
	const initFiltersPayload: WorkFiltersPayload = {
		search: filters.title_like || '',
		selectedTagList: filters.tagList_like?.split('|') || [],
	}

	const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
		params: filters,
		enabled: router.isReady,
	})
	console.log({ data, isLoading, isValidating, size })
	// data: [ responsePage1, responsePage2 ]
	// responsePage1: { data, pagination }
	// workList = [...data1, ...data2, ...dataN]
	const workList: Array<Work> =
		data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
			result.push(...currentPage.data)

			return result
		}, []) || []

	// const { _limit, _totalRows, _page } = data?.pagination || {}
	// const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0

	function handleFiltersChange(newFilters: WorkFiltersPayload) {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...filters,
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
				<Box mb={4} mt={8}>
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work
					</Typography>
				</Box>

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

				<WorkList workList={workList} loading={!router.isReady || isLoading} />

				<Button variant="contained" onClick={() => setSize((x) => x + 1)}>
					Load More
				</Button>
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
