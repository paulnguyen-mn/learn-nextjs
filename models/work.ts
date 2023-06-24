export interface Work {
	id: string
	title: string
	tagList: string[]
	shortDescription: string
	fullDescription: string
	createdAt: string
	updatedAt: string
	thumbnailUrl: string
}

export interface WorkFiltersPayload {
	search: string
	tagList_search: string

	selectedTagList?: string[] // temp value to store autocomplete value, not send to API
}
