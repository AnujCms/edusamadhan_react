
import React, { useState } from 'react';
import { getIn } from 'formik'
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
import ImageDialog from './ImageDialogBox';

const useStyles = makeStyles(theme => ({

	bigAvatar: {
		// margin: 10,
		width: 100,
		height: 100,
		borderRadius: 50
	},
	hidden: {
		display: "none"
	},
	defaultImage: {
		padding: 100,
		width: 100,
		cursor: "pointer"
	},

	posRel: {
		position: "relative"
	},
	editPen: {
		cursor: "pointer",
		width: 35
	},
	EditButton: {
		position: "absolute",
		bottom: '5%',
		right: '0%',
		minWidth: 0,
		[theme.breakpoints.down('sm')]: {
			right: '38%',
		}
	},
	imgPic:{
		width:150,height: 150,background: "#fff",textAlign: "center",display: "flex",justifyContent: "center",alignItems: "center"
	}
}));
export default function ({ field, form, name,  authenticatedApiCall, error, onChange, onBlur, defaultsrc, displayErrorMessage = true, ...otherProps }) {
	const classes = useStyles();
	const [img, setimg] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = React.useState(false);

	const handleEdit = (event) => {
		setAnchorEl(event.currentTarget);
	}
	const handleOpenDialog = () => {
		setOpen(true);
		setAnchorEl(null);
	}

	const handleCloseDialog = (value) => {
		setOpen(false);
		if (value.file !== undefined) {
			let file = value.file;
			setimg(value.base64Rep);
			file.base64Rep = value.base64Rep;
			form.setFieldValue(field.name, file);
		}
	};
	const handleCloseDialogBox = () => {
		setOpen(false);
	};
	const handleClose = () => {
		setAnchorEl(null);

	}

	const handleRemovePic = () => {
		authenticatedApiCall('delete', '/api/provider/ProviderService/deleteProfilePic', null)
		form.setFieldValue(field.name, null);
		let img = null
		setimg(img);
		setAnchorEl(null);
	}

	const blurHandler = (event) => {
		form.setFieldTouched(field.name);
		if (onBlur) {
			onBlur(event);
		}
	}
	const errorText = getIn(form.errors, field.name);
	return (
		<>
			<div className={classes.imgPic}>
				<input name={field.name} type="file" accept="image/jpeg,image/jpg,image/png" className={classes.hidden} onClick={handleOpenDialog} onBlur={blurHandler} />
				{errorText ? <img src={defaultsrc} className={classes.defaultImage} onClick={handleOpenDialog} /> :
					img ? <div className={classes.posRel}><Avatar className={classes.bigAvatar} src={img} /><Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleEdit} className={classes.EditButton}>
						<img className={classes.editPen} src={process.env.PUBLIC_URL + '/images/edit.png'} /></Button>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleOpenDialog}>Change Photo</MenuItem>
							{/* <MenuItem onClick={handleRemovePic}>Remove Photo</MenuItem> */}
        
      </Menu>
        </div> :
          field.value ? <div className={classes.posRel}><Avatar className={classes.bigAvatar} src={"data:image/jpeg;base64," + field.value} />
				<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleEdit} className={classes.EditButton}>
					<img className={classes.editPen} src={process.env.PUBLIC_URL + '/images/edit.png'} onClick={handleEdit} /></Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					// keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleOpenDialog}>Change Photo</MenuItem>
					{/* <MenuItem onClick={handleRemovePic}>Remove Photo</MenuItem> */}
				</Menu>
			</div> :
            <img src={defaultsrc} className={classes.defaultImage} onClick={handleOpenDialog} />}
      {displayErrorMessage && (
				<Typography variant="caption" color="error">
					<p>{errorText}</p>
				</Typography>
			)}
			<ImageDialog open={open} onClose={handleCloseDialog} errorText={errorText} form={form} field={field} defaultsrc={defaultsrc} onCloseDialog={handleCloseDialogBox} />
			</div>
		</>
	)

}
