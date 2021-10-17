import { LoginPayload } from '@/models/auth'
import axiosClient from './axiosClient'

const authApi = {
	login(payload: LoginPayload) {
		return axiosClient.post('/login', payload)
	},
}

export default authApi
