import { ListParams, ListResponse, Work } from '@/models'
import axiosClient from './axios-client'

export const workApi = {
	getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
		return axiosClient.get('/works', { params })
	},

	get(id: string): Promise<Work> {
		return axiosClient.get(`/works/${id}`)
	},
}
