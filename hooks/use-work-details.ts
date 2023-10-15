import { workApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseWorkDetailsProps {
	workId: string
	options?: SWRConfiguration
	enabled?: boolean
}

export function useWorkDetails({ workId, options, enabled = true }: UseWorkDetailsProps) {
	const swrResponse = useSWR(
		enabled ? [QueryKeys.GET_WORK_DETAILS, workId] : null,
		() => workApi.get(workId),
		{
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
			...options,
		}
	)

	async function updateWork(payload: FormData) {
		const newWork = await workApi.update(payload)
		swrResponse.mutate(newWork)
		return newWork
	}

	return { ...swrResponse, updateWork }
}
