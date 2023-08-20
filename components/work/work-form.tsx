import { useTagList } from '@/hooks'
import { WorkPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { AutocompleteField, EditorField, InputField, PhotoField } from '../form'

export interface WorkFormProps {
	initialValues?: Partial<WorkPayload>
	onSubmit?: (payload: FormData) => void
}

export function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
	const schema = yup.object().shape({
		title: yup.string().required('Please enter work title'),
		shortDescription: yup.string().required('Please enter work description'),
		tagList: yup.array().of(yup.string()).min(1, 'Please select at least one category'),
		thumbnail: yup
			.object()
			.nullable()
			.test('test-required', 'Please select an image.', (value) => {
				// required when add
				// optional when edit
				if (Boolean(initialValues?.id) || Boolean(value?.file)) return true

				// return context.createError({ message: 'Please select an image.' })
				return false
			})
			.test('test-size', 'Maximum size exceeded. Please select another file.', (value) => {
				const fileSize = value?.file?.['size'] || 0
				const MB_TO_BYTES = 1024 * 1024
				const MAX_SIZE = 3 * MB_TO_BYTES // 3MB

				return fileSize <= MAX_SIZE
			}),
	})

	const { data } = useTagList({})
	const tagList = data?.data || []

	const { control, handleSubmit } = useForm<Partial<WorkPayload>>({
		defaultValues: {
			title: '',
			shortDescription: '',
			tagList: [],
			thumbnail: initialValues?.id
				? {
						file: null,
						previewUrl: initialValues?.thumbnailUrl,
				  }
				: null,
			fullDescription: '',
			...initialValues,
		},
		resolver: yupResolver(schema),
	})

	async function handleLoginSubmit(formValues: Partial<WorkPayload>) {
		if (!formValues) return

		const payload = new FormData()

		// id
		if (formValues.id) {
			payload.set('id', formValues.id)
		}

		// thumbnail
		if (formValues.thumbnail?.file) {
			payload.set('thumbnail', formValues.thumbnail?.file)
		}

		// taglist
		formValues.tagList?.forEach((tag) => {
			payload.append('tagList', tag)
		})

		// title, short description, full description
		const keyList: Array<keyof Partial<WorkPayload>> = [
			'title',
			'shortDescription',
			'fullDescription',
		]
		keyList.forEach((name) => {
			if (initialValues?.[name] !== formValues[name]) {
				payload.set(name, formValues[name] as string)
			}
		})

		console.log('form submit', formValues)

		payload.forEach((value, key) => {
			console.log(key, value)
		})

		await onSubmit?.(payload)
	}

	return (
		<Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
			<InputField name="title" label="Title" placeholder="Your Work Title" control={control} />

			<InputField
				name="shortDescription"
				label="Short description"
				placeholder="Your work description"
				control={control}
				InputProps={{
					multiline: true,
					rows: 3,
				}}
			/>

			<AutocompleteField
				name="tagList"
				label="Categories"
				control={control}
				options={tagList}
				getOptionLabel={(option) => option}
				isOptionEqualToValue={(option, value) => option === value}
			/>

			<PhotoField name="thumbnail" control={control} label="Thumbnail" />
			<EditorField name="fullDescription" control={control} label="Full Description" />

			<Button variant="contained" type="submit" size="medium">
				{initialValues?.id ? 'Save' : 'Submit'}
			</Button>
		</Box>
	)
}
