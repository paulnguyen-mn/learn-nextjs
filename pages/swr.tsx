import { StudentDetail } from '@/components/swr'
import React, { useState } from 'react'

export default function SWRPage() {
	const [detailList, setDetailList] = useState([1, 1, 1])

	function handleAddClick() {
		setDetailList((prevList) => [...prevList, 1])
	}

	return (
		<div>
			<h1>SWR Playground</h1>
			<button onClick={handleAddClick}>Add detail</button>

			<ul>
				{detailList.map((x, index) => (
					<li key={index}>
						<StudentDetail studentId="sktwi1cgkkuif36f3" />
					</li>
				))}
			</ul>
		</div>
	)
}
