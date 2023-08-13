import { Box, FormHelperText, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export type EditorFieldProps<T extends FieldValues> = {
	name: Path<T>
	control: Control<T>
	label?: string
}

export function EditorField<T extends FieldValues>({ name, control, label }: EditorFieldProps<T>) {
	const {
		field: { onChange, value, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, false] }],
				[{ color: [] }, { background: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link', 'image'],
				['clean'],
			],
			handlers: {
				// image: imageHandler,
			},
		},
	}

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'color',
		'background',
	]

	return (
		<Box sx={{ my: 1.5 }}>
			<Typography variant="body2">{label}</Typography>

			<Box>
				{/* editor - react quill */}
				<ReactQuill theme="snow" modules={modules} formats={formats} />
			</Box>

			<FormHelperText error={!!error}>{error?.message}</FormHelperText>
		</Box>
	)
}
