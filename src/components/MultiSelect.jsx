import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import { TextField, Paper, Chip, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	input: {
		display: 'flex',
		padding: "2px 0",
		background: "rgba(249, 250, 250, 0.4)",
		minHeight: "44px",
		cursor: "pointer"
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		paddingLeft: 10,
		alignItems: 'center',
		overflow: 'hidden',
		fontSize: 14,
		// padding:"27px 12px 10px"
	},
	textFeildWrap:{
		padding:"22px 12px 10px"
	},
	chip: {
		margin: `${theme.spacing(.2)}px ${theme.spacing(.4)}px`,
		backgroundColor:"transparent",
		"& span":{
			paddingLeft:0
		}
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08,
		),
	},
	noOptionsMessage: {
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
	},
	singleValue: {
		fontSize: 16,
	},
	placeholder: {
		position: 'absolute',
		left: 10,
		fontSize: 16,
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0,
	},
	checkBoxStyle:{
		borderBottom:"1px solid #dadfe0",
		"&:last-child":{
			borderBottom:"none",
		}
	}
});

function NoOptionsMessage(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />;
}

function Control(props) {
	return (

		<TextField
			fullWidth
			InputLabelProps={{
				shrink:
					props.hasValue || props.isFocused || props.isMenuOpen ? true : false
			}}
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400,
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

function checkBoxOption(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 700 : 400,
			}}
			className={props.selectProps.classes.checkBoxStyle}
			{...props.innerProps}
		>
			<FormControlLabel control={<Checkbox checked={props.isSelected} color="secondary" />} label={props.children} />

		</MenuItem>
	);

}

function Placeholder(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.placeholder}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function SingleValue(props) {
	return (
		<Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
			{props.children}
		</Typography>
	);
}

function ValueContainer(props) {
	if (props.isMulti === true) {
		return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
	}
	else{
		return <div className={props.selectProps.classes.valueContainer+" "+props.selectProps.classes.textFeildWrap}>{props.children}</div>;
	}
}

	function MultiValue(props) {
		return (
			<Chip
				tabIndex={-1}
				label={props.children}
				className={classNames(props.selectProps.classes.chip, {
					[props.selectProps.classes.chipFocused]: props.isFocused,
				})}
				onDelete={props.removeProps.onClick}
				deleteIcon={<CancelIcon {...props.removeProps} />}
			/>
		);
	}

	function checkBoxMutliValue(props) {
		return (
			props.getValue()[0] === props.data ?
				(<>{props.selectProps.name ? `${props.selectProps.name}:` : ""}<Chip
					tabIndex={-1}
					label={props.getValue().length + ' selected'}
					className={classNames(props.selectProps.classes.chip, {
						[props.selectProps.classes.chipFocused]: props.isFocused,
					})}
				/></>) : ""
		);

	}

	function Menu(props) {
		return (
			<Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
				{props.children}
			</Paper>
		);
	}

	const components = {
		Control,
		Menu,
		MultiValue,
		NoOptionsMessage,
		Option,
		Placeholder,
		SingleValue,
		ValueContainer,
	};

	const checkBoxComponents = {
		Control,
		Menu,
		MultiValue: checkBoxMutliValue,
		NoOptionsMessage,
		Option: checkBoxOption,
		Placeholder,
		SingleValue,
		ValueContainer,

	}

	class SelectAutoComplete extends React.Component {



		render() {
			const { classes, theme, suggestions, placeholder, checkBoxStyled, isMulti, hideSelectedOptions, ...other } = this.props;

			let selectComponents = components;

			const selectStyles = {
				input: base => ({
					...base,
					color: theme.palette.text.primary,
					'& input': {
						font: 'inherit',
					},
				}),
			};
			let isMutlipleAllowed = isMulti;
			let isHideSelectOptions = hideSelectedOptions;
			if (checkBoxStyled) {
				selectComponents = checkBoxComponents;
				isMutlipleAllowed = true;
				isHideSelectOptions = false;
			}
			return (
				<div className={classes.root}>
					<NoSsr>
						<Select

							classes={classes}
							styles={selectStyles}
							components={selectComponents}
							placeholder={placeholder}
							onChange={this.handleChange}
							isMulti={isMutlipleAllowed}
							hideSelectedOptions={isHideSelectOptions}
							{...other}
						/>
					</NoSsr>
				</div>
			)

		}

	}

	export default withStyles(styles, { withTheme: true })(SelectAutoComplete);