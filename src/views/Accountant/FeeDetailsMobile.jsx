import React from 'react';
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { withStyles } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faDatabase , faUserEdit, faFastBackward } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import AuthenticatedPage from "../AuthenticatedPage";
import AllMonthFee from './AllMonthFee';
import CreateFeeStructure from './ManageMonthlyFee/CreateFeeStructure';

const styles = theme => ({
    pendingStatus: { color: "#00aacb" },
    status: { textAlign: 'center', fontSize: "11px", display: "inline-flex", marginRight: "5px", fontWeight: "bold", whiteSpace: "nowrap" },
    circle: { width: "8px", height: "8px", borderRadius: "50%", display: "inline-flex", marginRight: "5px" },
    statusDiv: { float: "right" },
    fontSize45: { fontSize: '1.2rem !important' },
    iconSize: { fontSize: 35 },
    texeCenter: { textAlign: 'center' },
    actions: { bottom: 0, position: "fixed", marginBottom: 0, left: 0 },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } },
    addColor: { color: theme.palette.primary.main }
})
class FeeDetailsMobile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "allmonthfee",
        }
    }
    handleUpdateFeeStructure = () => {
        this.setState({ activeComponent: "updatefeestructure" })
    }
    handleAllMonthFee = () => {
        this.setState({ activeComponent: "allmonthfee" })
    }
    handleBackToDashboard = () => {
        this.setState({ activeComponent: "backtodashboard" })
    }

    getBodyComponent = (classid) => {
        let activeComponent = this.state.activeComponent;
        if (activeComponent === "allmonthfee") {
            return <AllMonthFee {...this.props}/>
        }
        else if (activeComponent === 'updatefeestructure') {
            return <CreateFeeStructure classid={classid} />
        }
        else if (activeComponent === "backtodashboard") {
            this.props.history.push('../feedetails')
        }
    }

    findCssForStatus = (value) => {
        if (value) {
            return (
                <CardBody className={this.props.classes.fontSize45} style={{ borderBottom: "2px solid #00aacb" }}>
                    <span>Class <b>{value.class}</b> Fee Details</span>
                </CardBody>
            )
        }

    }

    render() {
        const { classes } = this.props;
        const feeDetails = this.props.location.state
        return (
            <>
                <div>
                    <Card style={{ marginBottom: 0 }}>
                        {this.findCssForStatus(feeDetails)}
                    </Card>
                </div>
                {this.getBodyComponent(feeDetails.action.class)}

                <Card className={classes.actions} >
                    <GridContainer style={{ justifyContent: "space-around" }}>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleBackToDashboard} className={this.state.activeComponent === "createresult" ? classes.addColor : null}><FontAwesomeIcon icon={faFastBackward} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleAllMonthFee} className={this.state.activeComponent === "allmonthfee" ? classes.addColor : null}><FontAwesomeIcon icon={faAddressCard} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={2} xs={2} className={classes.texeCenter}><Button onClick={this.handleUpdateFeeStructure} className={this.state.activeComponent === "updatefeestructure" ? classes.addColor : null}><FontAwesomeIcon icon={faUserEdit} className={classes.iconSize} /></Button></GridItem>
                        <GridItem sm={3} xs={3} className={classes.texeCenter}><Button disabled onClick={this.handleLogbook} className={this.state.activeComponent === "logbook" ? classes.addColor : null}><FontAwesomeIcon icon={faDatabase} className={classes.iconSize} /></Button></GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default withStyles(styles)(AuthenticatedPage(["FeeAccount"])(FeeDetailsMobile));