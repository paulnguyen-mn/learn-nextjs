import { LoginPayload } from '@/models/auth'
import axiosClient from './axios-client'

const authApi = {
	login(payload: LoginPayload) {
		return axiosClient.post('/login', payload)
	},

	logout() {
		return axiosClient.post('/logout')
	},

	getProfile() {
		return axiosClient.get('/profile')
	},
}

export default authApi
