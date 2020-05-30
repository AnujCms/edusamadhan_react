import React, { useState, useRef, useEffect } from 'react';
import { getIn } from 'formik'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AvatarEditor from 'react-avatar-editor'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles(theme => ({

    bigAvatar: {
        // margin: 10,
        width: "100%",
        // height: 200,
        borderRadius: 0
    },
    hidden: {
        display: "none"
    },
    defaultImage: {
        padding: 75,
        width: "100%",
        backgroundColor: "rgba(65, 158, 213, 0.1)",
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
        right: '28%',
        minWidth: 0,
        [theme.breakpoints.down('sm')]: {
            right: '38%',
        }
    },
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
        width: "600px",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    primaryBtn: {
        color: theme.palette.text.textPrimaryColor,
        backgroundColor: theme.palette.primary.main,
        textTransform: "capitalize",
        border: "1px solid " + theme.palette.border.primaryBorder,
        borderRadius: "50px",
        textAlign: "right",
        padding: "4px 15px",
        marginLeft: "7px",
        '&:hover': {
            backgroundColor: theme.palette.hoverPrimaryColor.main,
            color: theme.palette.text.hoverTextPrimaryColor,
            border: "1px solid " + theme.palette.border.hoverPrimaryBorder,
        }
    },
    thirdBtn: {
        color: theme.palette.text.textThirdColor,
        backgroundColor: theme.palette.thirdColor.main,
        border: "1px solid " + theme.palette.border.thirdBorder,
        borderRadius: "25px",
        padding: "6px 17px",
        fontWeight: "400",
        lineHeight: "1.42857143",
        '&:hover': {
            color: theme.palette.text.hoverTextThirdColor,
            backgroundColor: theme.palette.hoverThirdColor.main,
            border: "1px solid " + theme.palette.border.hoverThirdBorder
        }
    },
    gridPadding:{
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    }
}));

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
export default function (props) {

    const classes = useStyles();
    const [img, setimg] = useState();
    const [rotate, setrotate] = useState(0);
    const [scale, setscale] = useState(1);
    const [imageSelected, setImage] = useState(true)
    const { onClose, open, onCloseDialog} = props;
    let currentEditor = useRef();
    let inputRef = useRef()
    useEffect(() => {
        (props.open && imageSelected) && setimg(props.defaultsrc)
    });
    const handleBrowseImage = () => {
        inputRef.current.click()
    }
    const changeHandler = async (e) => {
        let file = e.target.files[0];
        const SUPPORTED_FORMATS = [
            "image/jpg",
            "image/jpeg",
            "image/png"
        ];
        if (file) {
            if (SUPPORTED_FORMATS.includes(file.type)) {

                setimg(file);
                setImage(false)
                
            } else {
                file.base64Rep = img
                props.form.setFieldValue(props.field.name, file)
            }
        }
    }
    const handleSave = () => {
        if (currentEditor && !imageSelected) {
            var image = {
                file: img,
                base64Rep: currentEditor.current.getImageScaledToCanvas().toDataURL()
            }
            setrotate(0);
            setscale(1);
            setimg(props.defaultsrc);
            setImage(true);
        }
        imageSelected ? onCloseDialog() : onClose(image)
    }
    const handleCloseDialogBox = () => {
        setrotate(0);
        setscale(1);
        setimg(props.defaultsrc);
        setImage(true);
        onCloseDialog()
    }
    const rotateLeft = () => {
        setrotate(rotate - 90)
    }
    const rotateRight = () => {
        setrotate(rotate + 90)
    }

    const ZoomComponent = (props) => {
        const { children, open, value } = props;
        const popperRef = React.useRef(null);
        React.useEffect(() => {
            if (popperRef.current) {
                popperRef.current.update();
                setscale(value)
            }
        })
        return (
            <Tooltip
                PopperProps={{
                    popperRef,
                }}
                open={open}
                enterTouchDelay={0}
                placement="top"
                title={value}
            >
                {children}
            </Tooltip>
        );
    }
    
    return (
        <>
            <Dialog aria-labelledby="simple-dialog-title" open={open}>
                <MuiDialogTitle id="customized-dialog-title" className={classes.root}>Choose Image </MuiDialogTitle>
                <DialogContent style={{ paddingTop: "20px", paddingBottom: "20px", fontSize: "14px" }}>

                    <GridContainer >

                        <GridItem md={5} lg={5} sm={12} xs={12} >
                            <AvatarEditor image={img} ref={currentEditor} className={imageSelected ? classes.defaultImage : undefined} width={200} height={200} border={0} rotate={rotate} scale={scale} />
                                <Typography variant="caption" color="error">
                                    <p>{props.errorText}</p>
                                </Typography>
                            
                            
                        </GridItem>
                        <GridItem md={7} lg={7} sm={12} xs={12} className={classes.gridPadding}>
                            <input type="file" ref={inputRef} className={classes.hidden} onChange={changeHandler} accept="image/jpeg,image/jpg,image/png"/>
                            
                            <br />
                            <Button onClick={handleBrowseImage} className={classes.thirdBtn}>Image</Button>
                            <br /><br />
                            Rotate: <span><Button onClick={rotateLeft} className={classes.primaryBtn} >Left</Button><Button className={classes.primaryBtn} onClick={rotateRight}>Right</Button></span><br /><br />
                            Zoom: <Slider
                                ValueLabelComponent={ZoomComponent}
                                aria-label="custom thumb label"
                                defaultValue={1}
                                max={4}
                                min={1}
                                step={0.1}
                            />
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={handleSave} className={classes.primaryBtn} >Save</Button>
                    <Button className={classes.thirdBtn} onClick={handleCloseDialogBox}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
