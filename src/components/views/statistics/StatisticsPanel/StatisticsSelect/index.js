import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';
import StatisticsConfigurationItem from '../StatisticsConfigurationItem';

const StatisticsSelect = ({
	label,
	placeholder,
	options,
	value,
	isMulti,
	isSearchable,
	disabled,
	onChange,
}) => {
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			background: state.isFocused
				? 'var(--accent35)'
				: state.isDisabled
				? 'var(--base90)'
				: 'var(--base75)',
			padding: '0 10px 0 0',
			borderWidth: '0',
			borderRadius: '0',
			boxShadow: '0',
			color: state.isFocused ? 'var(--base100)' : 'var(--base10)',
			'&:hover': {
				color: state.isFocused ? 'var(--base100)' : 'var(--base10)',
				background: state.isFocused ? 'var(--accent35)' : 'var(--base65)',
			},
			width: '100%',
			cursor: 'pointer',
			minHeight: '2.25rem',
		}),
		container: provided => ({
			...provided,
			fontSize: '1rem',
			borderRadius: '0',
		}),
		indicatorSeparator: provided => ({
			...provided,
			display: 'none',
		}),
		dropdownIndicator: (provided, state) => {
			return {
				...provided,
				padding: '0',
				cursor: 'pointer',
				color: state.isFocused ? 'var(--base100)' : 'var(--base0)',
				opacity: state.isDisabled ? 0.1 : 0.5,
				transition: 0,
				transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
				'&:hover': {
					opacity: 1,
					color: 'inherit',
				},
			};
		},
		clearIndicator: (provided, state) => {
			return {
				...provided,
				padding: '5px',
				cursor: 'pointer',
				color: state.isFocused ? 'var(--base100)' : 'var(--base0)',
				opacity: 0.5,
				transition: 0,
				'&:hover': {
					opacity: 1,
					color: 'inherit',
				},
			};
		},
		input: provided => ({
			...provided,
			padding: isMulti ? '0 7px' : '0',
			margin: 0,
			cursor: 'pointer',
		}),
		singleValue: provided => ({
			...provided,
			fontWeight: 'bold',
			fontSize: '1rem',
			fontFamily: 'Sen, Roboto, sans-serif',
			letterSpacing: '-.5px',
			color: 'inherit',
			cursor: 'pointer',
			display: 'flex',
			flexDirection: 'column',
			lineHeight: 1.15,
		}),
		multiValue: provided => ({
			...provided,
			background: 'var(--base55)',
		}),
		multiValueLabel: provided => ({
			...provided,
			color: 'var(--base0)',
			fontWeight: 'bold',
			fontSize: '.875rem',
			padding: '3px 5px 2px',
			fontFamily: 'Sen, Roboto, sans-serif',
		}),
		multiValueRemove: (provided, state) => ({
			...provided,
			color: 'var(--base0)',
			opacity: state.isDisabled ? 0.1 : 1,
			cursor: 'pointer',
			'&:hover': {
				color: 'var(--base10)',
				background: 'var(--base40)',
			},
		}),
		valueContainer: provided => ({
			...provided,
			color: disabled ? 'var(--base40)' : provided.color,
			padding: isMulti ? '3px' : '0px 10px',
			cursor: 'text',
		}),
		placeholder: provided => ({
			...provided,
			padding: isMulti ? '0 5px' : '0px',
		}),
		menu: provided => ({
			...provided,
			zIndex: 1000,
			minWidth: '11.15rem',
			border: '1px solid var(--base75)',
			borderRadius: '.15rem',
			background: 'rgba(var(--base100rgb),.75)',
			backdropFilter: 'blur(6px) saturate(180%)',
		}),
		option: (provided, state) => ({
			...provided,
			pointerEvents: state.isDisabled ? 'none' : 'auto',
			cursor: 'pointer',
			color: state.isDisabled
				? 'var(--base65)'
				: state.isSelected
				? 'var(--base100)'
				: 'var(--base0)',
			fontSize: '.875rem',
			fontFamily: 'Roboto, sans-serif',
			padding: '10px',
			'&:hover': {
				background: state.isSelected
					? 'var(--accent30)'
					: 'rgba(var(--base50rgb), .5)',
			},
		}),
	};

	return (
		<StatisticsConfigurationItem label={label}>
			<ReactSelect
				className="worldCereal-StatisticsSelect"
				styles={customStyles}
				theme={theme => ({
					...theme,
					colors: {
						...theme.colors,
						primary25: 'rgba(var(--base50rgb), .5)',
						primary50: 'var(--accent35)',
						primary: 'var(--accent35)',
						neutral0: 'var(--base10)',
						neutral20: 'var(--base50)',
						neutral80: 'var(--base80)',
						neutral90: 'var(--base90)',
					},
				})}
				placeholder={placeholder || 'Select...'}
				isMulti={isMulti}
				isClearable={isMulti}
				isSearchable={isSearchable}
				options={options}
				value={value}
				isDisabled={disabled}
				onChange={onChange}
			/>
		</StatisticsConfigurationItem>
	);
};

StatisticsSelect.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	isMulti: PropTypes.bool,
	isSearchable: PropTypes.bool,
	disabled: PropTypes.bool,
	options: PropTypes.array,
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
		PropTypes.bool,
	]),
	small: PropTypes.bool,
	menuPosition: PropTypes.string,
	menuWidth: PropTypes.string,
	onChange: PropTypes.func,
};

export default StatisticsSelect;
