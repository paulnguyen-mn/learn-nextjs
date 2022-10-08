import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	function handleLoginSubmit(values: any) {
		console.log(values)
	}

	return (
		<Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
			<InputField name="username" control={control} />
			<InputField
				type={showPassword ? 'text' : 'password'}
				name="password"
				control={control}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPassword((x) => !x)}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<Button type="submit" variant="contained">
				Login
			</Button>
		</Box>
	)
}
