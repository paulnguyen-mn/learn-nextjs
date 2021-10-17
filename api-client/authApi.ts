import { LoginPayload } from '@/models/auth'
import axiosClient from './axiosClient'

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
