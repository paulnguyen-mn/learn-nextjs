import { Seo } from '@/components/common'
import { HeroSection, RecentPosts, FeatureWorks } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'
import { Box } from '@mui/system'

const Home: NextPageWithLayout = () => {
	return (
		<Box>
			<Seo
				data={{
					title: 'NextJS Tutorials | Easy Frontend',
					description:
						'Step by step tutorials to build a full CRUD website using NextJS for beginners',
					url: 'https://learn-nextjs-fawn.vercel.app/',
					thumbnailUrl:
						'https://cdn.getshifter.co/caa65008efb706a8bfc6f7e4045d6a018420c3df/uploads/2020/11/nextjs.png',
				}}
			/>

			<HeroSection />
			<RecentPosts />
			<FeatureWorks />
		</Box>
	)
}

Home.Layout = MainLayout

export default Home
