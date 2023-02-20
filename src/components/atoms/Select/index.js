import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';

const Select = ({
	options,
	value,
	isMulti,
	disabled,
	small,
	menuPosition,
	onChange,
}) => {
	const customStyles = {
		control: provided => ({
			...provided,
			background: 'transparent',
			minHeight: small ? '1.5rem' : '2rem',
			borderColor: 'var(--base40)',
			':hover': {
				borderColor: 'var(--base60)',
			},
		}),
		container: provided => ({
			...provided,
			fontSize: '1rem',
			borderRadius: '0.25rem',
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			padding: small ? '0.3rem' : '0.7rem',
			cursor: 'pointer',
			color: state.isFocused ? 'var(--accent55)' : 'hsl(0, 0%, 60%)',
			':hover': {
				color: 'var(--base80)',
				backgroundColor: 'rgba(var(--base50rgb), 0.12)',
			},
		}),
		input: provided => ({
			...provided,
			fontWeight: '400',
		}),
		singleValue: provided => ({
			...provided,
			fontWeight: '500',
		}),
		valueContainer: provided => ({
			...provided,
			padding: small ? '0px 6px' : '2px 8px',
			cursor: 'text',
		}),
		option: provided => ({
			...provided,
			cursor: 'pointer',
		}),
		menu: provided => ({
			...provided,
			border: '1px solid var(--base30)',
		}),
	};

	return (
		<ReactSelect
			className="ptr-ReactSelect"
			styles={customStyles}
			theme={theme => ({
				...theme,
				colors: {
					...theme.colors,
					primary25: 'var(--accent20)',
					primary50: 'var(--accent30)',
					primary: 'var(--accent50)',
					neutral0: 'var(--base10)',
					neutral20: 'var(--base40)',
					neutral80: 'var(--base80)',
					neutral90: 'var(--base90)',
				},
			})}
			isMulti={isMulti}
			isClearable={false}
			options={options}
			value={value}
			isDisabled={disabled}
			onChange={onChange}
			menuPosition={menuPosition}
		/>
	);
};

Select.propTypes = {
	isMulti: PropTypes.bool,
	disabled: PropTypes.bool,
	options: PropTypes.array,
	value: PropTypes.object,
	small: PropTypes.bool,
	menuPosition: PropTypes.string,
	onChange: PropTypes.func,
};

export default Select;
