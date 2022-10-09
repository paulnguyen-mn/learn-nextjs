import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Control, useController } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
	name: string
	control: Control<any>
}

export function InputField({
	name,
	control,
	onChange: externalOnChange,
	onBlur: externalOnBlur,
	ref: externalRef,
	value: externalValue,
	...rest
}: InputFieldProps) {
	const {
		field: { onChange, onBlur, value, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	// render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
	return (
		<TextField
			fullWidth
			size="small"
			margin="normal"
			name={name}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			inputRef={ref}
			error={!!error}
			helperText={error?.message}
			{...rest}
		/>
	)
}
