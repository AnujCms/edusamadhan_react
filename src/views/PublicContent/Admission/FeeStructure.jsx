import React from 'react';
import { withStyles, Button, Typography, Grid } from '@material-ui/core';
import MuiThemeDataTable from '../../../components/MuiThemeDataTable';
import SuccessDialog from '../../../components/SuccessDialog';
import ErrorDialog from '../../../components/ErrorDialog';
import Spinner from '@material-ui/core/CircularProgress';
import AdminImage from '../../../assets/images/admin.png';
import { Helmet } from "react-helmet";
import { handleClassLabel, handleSectionLabel, handleGenderLabel, handleReligionLabel, handleMediumLabel, handleCategoryLabel, handleLocalityLabel } from '../../../components/utilsFunctions';
import axios from 'axios';
import _ from 'lodash';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    avatar: { width: 60, height: 60 },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    OkButton: { backgroundColor: theme.palette.button.okButtonBackground, borderRadius: "15px", fontSize: "12px", color: "#fff", width: "100px", textAlign: "right", '&:hover': { background: theme.palette.button.okButtonHover } }
});


class FeeStructure extends React.Component {
    state = {
        hindiMediumFee: [], englishMediumFee: [], isHindiMedium: false, isEnglishMedium: false, noDtataFound: false, errorMessage: ''
    };

    tableheads1 = [
        {
            name: "classId",
            label: "Class",
            options: {
                filter: false,
                sort: true,
                searchable: true,
                customBodyRender: (value) => {
                    return <p><b>{value}</b></p>
                }
            }
        },
        {
            name: "monthlyFee",
            label: "Monthly Fee",
            options: {
                filter: false,
                sort: false,
                searchable: true
            }
        },
        {
            name: "admissionFeeOld",
            label: "Admission Fee(Old Students)",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        },
        {
            name: "admissionFeeNew",
            label: "Admission Fee(New Students)",
            options: {
                filter: false,
                sort: false,
                searchable: false
            }
        }
    ];


    async componentDidMount() {
        let accountId = '8e5bc300-bdda-11ea-a29d-51982c80e8b2'
        axios.get('/api/publiccontent/getSchoolsFeeDetails/' + accountId).then(response => {
            if (response.data.status == 1) {
                const grouped = _.groupBy(response.data.statusDescription, "mediumType");
                let separatedArray = Object.keys(grouped).map((key) => grouped[key]);
                separatedArray[0].map((item) => {
                    let englishMedium = []
                    separatedArray[1].map((item) => {
                        englishMedium.push({
                            classId: item.classId,
                            monthlyFee: item.january,
                            admissionFeeOld: '1000',
                            admissionFeeNew: '2000'
                        })
                    })
                    this.setState({ isEnglishMedium: true, englishMediumFee: englishMedium })
                })
                if (separatedArray.length == 2) {
                    let hindiMedium = []
                    separatedArray[1].map((item) => {
                        hindiMedium.push({
                            classId: item.classId,
                            monthlyFee: item.january,
                            admissionFeeOld: '1000',
                            admissionFeeNew: '2000'
                        })
                    })
                    this.setState({ isHindiMedium: true, hindiMediumFee: hindiMedium })
                }
            } else if (response.data.status == 0) {
                this.setState({ noDtataFound: true, errorMessage: response.data.statusDescription })
            }
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Fee Structure</title></Helmet>
                {this.state.isEnglishMedium && <><Grid container className={classes.GridContainer}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>

                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <MuiThemeDataTable title={"English Medium Fee"} rows={this.state.englishMediumFee} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="studentsList" />
                    </Grid><br></br><br></br><hr></hr>

                </Grid></>}
                {this.state.isHindiMedium && <><Grid container className={classes.GridContainer}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>

                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <MuiThemeDataTable title={"Hindi Medium Fee"} rows={this.state.hindiMediumFee} columns={this.tableheads1} rowDetailsRedirectFunction={this.displayStudentDetailsForMobileView} tableContent="studentsList" />
                    </Grid>

                </Grid></>}
                {this.state.noDtataFound && <><Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{this.state.errorMessage}</Typography></>}
            </div>
        );
    }
}

export default withStyles(styles)(FeeStructure);
