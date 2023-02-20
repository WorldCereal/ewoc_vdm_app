import classNames from 'classnames';
import PropTypes from 'prop-types';

export const ColorClassesBar = ({colors, values, gradient}) => {
	return (
		<div className="worldCereal-ColorClassesBar">
			{gradient ? (
				<div
					className="worldCereal-ColorClassesBarItem"
					style={{
						backgroundImage: `linear-gradient(90deg, ${colors.join(',')})`,
					}}
				/>
			) : (
				colors.map((color, i) => (
					<div
						key={color}
						className="worldCereal-ColorClassesBarItem"
						style={{backgroundColor: color}}
						title={values ? `${values[i]} - ${values[i + 1]}` : ''}
					/>
				))
			)}
		</div>
	);
};

ColorClassesBar.propTypes = {
	colors: PropTypes.array.isRequired,
	values: PropTypes.array,
	gradient: PropTypes.bool,
};

export const ColorClassesValues = ({
	values,
	unit,
	round = true,
	firstLastValueOnly,
}) => {
	const classes = classNames('worldCereal-ColorClassesValues', {
		'is-firstAndLast': firstLastValueOnly,
		'without-unit': !unit,
	});

	return (
		<div className={classes}>
			{values.map((value, i) => {
				if (
					!firstLastValueOnly ||
					(firstLastValueOnly && (i === 0 || i === values?.length - 1))
				) {
					return (
						<span key={value} className="worldCereal-ColorClassesValue">
							{round ? Math.round(value) : value}{' '}
							{i === values.length - 1 && unit ? (
								<span className="worldCereal-ColorClassesValuesUnit">
									{unit}
								</span>
							) : null}
						</span>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

ColorClassesValues.propTypes = {
	firstLastValueOnly: PropTypes.bool,
	values: PropTypes.array.isRequired,
	unit: PropTypes.string,
	round: PropTypes.bool,
};

export const ColorClasses = ({children}) => {
	return <div className="worldCereal-ColorClasses">{children}</div>;
};

ColorClasses.propTypes = {
	children: PropTypes.node,
};
