import React from 'react';
import { withStyles, Typography, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { classOptions6to12, handleMixedoption } from '../../../components/utilsFunctions';
import FormHeader from '../../../components/FormHeader';

const styles = (theme) => ({
    root: {
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(5),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    }
});

class ViewMixedClasses extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRender: false, mixedClassData: ''
        }
    }

    componentDidMount = async () => {
        let response = await this.props.authenticatedApiCall('get', "/api/examinationservice/getmixedtype", null);
        if (response.data.status == 1) {
            response.data.statusDescription.map((item) => {
                let className = []
                item.mixedOptions = handleMixedoption(item.mixedOptions)
                JSON.parse(item.classArray).map((item1) => {
                    classOptions6to12.map((item2) => {
                        if (item1 == item2.value) {
                            className.push(item2.label + " ")
                        }
                    })
                    return className
                })
                item.classArray = className
                item.mixedStudentNumber = JSON.parse(item.mixedStudentList).length
                item.overFlowStudentListNUmber = JSON.parse(item.overFlowStudentList).length
            })
            this.setState({ isRender: true, mixedClassData: response.data.statusDescription })
        } else {
            this.setState({ isRender: false })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.state.isRender ? <>
                    <FormHeader headerText={`Mexed Class Details`} pageTitle={"Mixed Students"} />
                    <Table>
                        <TableHead>
                            {this.state.mixedClassData.map((item) =>
                                <TableRow>
                                    <TableCell style={{ border: '1px solid #000', height: '50px', textAlign: 'left' }}>{item.mixedOptions}</TableCell>
                                    <TableCell style={{ border: '1px solid #000', height: '50px', textAlign: 'left' }}>{item.classArray}</TableCell>
                                    <TableCell style={{ border: '1px solid #000', height: '50px', textAlign: 'left' }}>{item.mixedStudentNumber} (Mixed)</TableCell>
                                    <TableCell style={{ border: '1px solid #000', height: '50px', textAlign: 'left' }}>{item.overFlowStudentListNUmber} (Over flow)</TableCell>
                                </TableRow>
                            )}
                        </TableHead>
                    </Table> </> : <Typography variant="h4">Data not found</Typography>}
            </div>
        );
    }
}
export default withStyles(styles)(AuthenticatedPage()(connect(ViewMixedClasses)));