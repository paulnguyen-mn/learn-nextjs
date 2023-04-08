import { workApi } from '@/api-client'
import { MainLayout } from '@/components/layout'
import { useWorkList } from '@/hooks'
import { ListParams } from '@/models'
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
	const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 })

	const { data, isLoading } = useWorkList({ params: filters })
	console.log({ data, isLoading })

	// useEffect(() => {
	// 	;(async () => {
	// 		try {
	// 			const workList = await workApi.getAll({ _page: 1 })
	// 			console.log({ workList })
	// 		} catch (error) {
	// 			console.log('failed to fetch work list', error)
	// 		}
	// 	})()
	// }, [])

	function handleNextClick() {
		setFilters((prevFilters) => ({
			...prevFilters,
			_page: (prevFilters?._page || 0) + 1,
		}))
	}

	return (
		<div>
			Works Page
			<Box>
				<Button variant="contained" onClick={handleNextClick}>
					Next Page
				</Button>
			</Box>
		</div>
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
