import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { TextField } from '@mui/material'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export type AutocompleteFieldProps<T, K extends FieldValues> = Partial<
	AutocompleteProps<T, boolean, boolean, boolean>
> & {
	name: Path<K>
	control: Control<K>

	placeholder?: string
	label?: string

	options: T[]
	getOptionLabel: (option: T) => string
	onChange?: (selectedOptions: T[]) => void
}

export function AutocompleteField<T, K extends FieldValues>({
	name,
	control,
	onChange: externalOnChange,
	placeholder,
	label,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	...rest
}: AutocompleteFieldProps<T, K>) {
	const {
		field: { onChange, onBlur, value, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	// render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
	return (
		<Autocomplete
			multiple
			fullWidth
			size="small"
			options={options}
			disableCloseOnSelect
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{getOptionLabel(option) || '-'}
				</li>
			)}
			renderInput={(params) => (
				<TextField
					margin="normal"
					name={name}
					{...params}
					label={label}
					placeholder={placeholder}
					error={!!error}
					helperText={error?.message}
				/>
			)}
			onChange={(event, value) => {
				onChange(value)
				externalOnChange?.(value as T[])
			}}
			onBlur={onBlur}
			value={value}
			ref={ref}
		/>
	)
}
