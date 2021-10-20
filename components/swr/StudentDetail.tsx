import * as React from 'react'
import useSWR from 'swr'

export interface StudentDetailProps {
	studentId: string
}

const MILLISECOND_PER_HOUR = 60 * 60 * 1000

export function StudentDetail({ studentId }: StudentDetailProps) {
	const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
		revalidateOnFocus: false,
		dedupingInterval: MILLISECOND_PER_HOUR,
	})

	function handleMutateClick() {
		mutate({ name: 'easy frontend' }, true)
	}

	return (
		<div>
			Name: {data?.name || '--'} <button onClick={handleMutateClick}>mutate</button>
		</div>
	)
}
