interface Route {
	label: string
	path: string
	requireLogin?: boolean
}

export const ROUTE_LIST: Route[] = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Works',
		path: '/works?_page=1&_limit=3',
	},
	{
		label: 'Blog',
		path: '/blog',
	},
]
