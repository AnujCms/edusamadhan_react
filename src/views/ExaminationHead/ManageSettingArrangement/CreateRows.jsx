import React from 'react';
import { withStyles, Table, TableCell, TableHead } from '@material-ui/core';
import AuthenticatedPage from "../../AuthenticatedPage";
import { connect } from 'formik';
import { handleClassLabel } from '../../../components/utilsFunctions';

const styles = (theme) => ({
    root: {
        margin: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(5),
        [theme.breakpoints.down('md')]: { margin: 0, marginTop: 0 },
    }
});

class CreateRows extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectsArray: [], teachersArray: [], periodArray: [], daysArray: [], periodCountArray: [], mondayArray: [], tuesdayArray: [], wednesdayArray: [], thursdayArray: [], fridayArray: [], saturdayArray: []
        }
    }

    render() {
        const { classes, totalRows, totalColumns, data } = this.props;
        let rows = [];
        if (totalRows && totalColumns) {
            // Build the rows in an array
            let counter = 0;
            for (let y = 0; y < totalRows; y++) {
                // Build the cells in an array
                const cells = [];
                for (let x = 0; x < totalColumns; x++) {
                    cells.push(<Cell student={data[counter]} />);
                    counter = counter + 1;
                }
                // Put them in the row
                rows.push(<tr>{cells}</tr>);
            }
        }
        return (
            <div className={classes.root} >
                <Table><TableHead>{rows}</TableHead></Table>
            </div>
        );
    }
}

class Cell extends React.Component {
    render() {
        const { student } = this.props;
        return <>{student && <TableCell style={{ border: '1px solid #000', height: '50px', textAlign: 'left' }}>{student.studentName}{`(${handleClassLabel(student.classid, this.props.currentUser.userDetails.userType)})`}<br />{student.adharNumber}</TableCell>}</>;
    }
}
export default withStyles(styles)(AuthenticatedPage()(connect(CreateRows)));