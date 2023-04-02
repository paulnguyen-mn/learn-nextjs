import { workApi } from '@/api-client'
import { MainLayout } from '@/components/layout'
import React, { useEffect } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
	useEffect(() => {
		;(async () => {
			try {
				const workList = await workApi.getAll({ _page: 1 })
				console.log({ workList })
			} catch (error) {
				console.log('failed to fetch work list', error)
			}
		})()
	}, [])

	return <div>Works Page</div>
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
