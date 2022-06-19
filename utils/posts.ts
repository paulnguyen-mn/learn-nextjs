import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const BLOG_FOLDER = path.join(process.cwd(), 'blog')

export async function getPostList() {
	// read all markdown files
	const fileNameList = fs.readdirSync(BLOG_FOLDER)
	console.log(fileNameList)

	for (const fileName of fileNameList) {
		const filePath = path.join(BLOG_FOLDER, fileName)
		const fileContents = fs.readFileSync(filePath, 'utf8')
		// console.log(fileName, '\n', fileContents)

		const matterResult = matter(fileContents, { excerpt_separator: '<!-- truncate-->' })
		console.log(matterResult)
	}

	return []
}
