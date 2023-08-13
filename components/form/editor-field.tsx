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

	return (
		<Box sx={{ my: 1.5 }}>
			<Typography variant="body2">{label}</Typography>

			<Box>
				{/* editor - react quill */}
				<ReactQuill theme="snow" />
			</Box>

			<FormHelperText error={!!error}>{error?.message}</FormHelperText>
		</Box>
	)
}
