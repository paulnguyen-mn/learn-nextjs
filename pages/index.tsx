import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'
import { Box } from '@mui/system'
import { useRouter } from 'next/dist/client/router'

const Home: NextPageWithLayout = () => {
	const router = useRouter()

	function goToDetailPage() {
		router.push({
			pathname: '/posts/[postId]',
			query: {
				postId: 123,
				ref: 'social',
			},
		})
	}

	return <Box>Home Page</Box>
}

Home.Layout = MainLayout

export default Home
