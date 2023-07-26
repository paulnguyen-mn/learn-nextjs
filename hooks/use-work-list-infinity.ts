import axiosClient from '@/api-client/axios-client'
import { ListParams, ListResponse, Work } from '@/models'
import qs from 'qs'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

export interface UseWorkListInfinityProps {
	params: Partial<ListParams>
	options?: SWRInfiniteConfiguration
	enabled?: boolean
}

export function useWorkListInfinity({ params, options, enabled = true }: UseWorkListInfinityProps) {
	const swrResponse = useSWRInfinite<ListResponse<Work>>(
		(index: number, previousPageData: ListResponse<Work>) => {
			if (!enabled) return null

			// index starts at 0
			const page = index + 1
			const query: Partial<ListParams> = {
				...params,
				_page: page,
				_limit: 5,
			}

			// return null in case page > totalPages
			if (previousPageData) {
				const { _limit, _totalRows } = previousPageData.pagination || { _limit: 5, _totalRows: 0 }
				const totalPages = Math.ceil(_totalRows / _limit) // 1.1 --> 2
				if (page > totalPages) return null
			}

			return `/works?${qs.stringify(query)}`
		},
		(url: string) => axiosClient.get(url),
		{
			revalidateFirstPage: false,
			...options,
		}
	)

	return swrResponse
}
