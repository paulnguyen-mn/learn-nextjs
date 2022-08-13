export interface Author {
	name: string
	title: string
	profileUrl: string
	avatarUrl: string
}

export interface Post {
	id: number | string
	title: string
	publishedDate: string
	tagList: string[]
	description: string

	thumbnailUrl?: string
	slug: string
	author?: Author

	mdContent?: string
	htmlContent?: string
}
