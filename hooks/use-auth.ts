import authApi from 'api-client/auth-api'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

export function useAuth(options?: Partial<PublicConfiguration>) {
	const {
		data: profile,
		error,
		mutate,
	} = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000,
		revalidateOnFocus: false,
		revalidateOnMount: true,
		...options,
	})

	const loading = !profile && !error

	async function login() {
		await authApi.login({
			username: 'test1',
			password: '123123',
		})

		await mutate(null, true)
	}

	async function logout() {
		await authApi.logout()
		mutate({}, false)
	}

	return {
		profile,
		error,
		loading: loading,
		mutate,
		login,
		logout,
	}
}
