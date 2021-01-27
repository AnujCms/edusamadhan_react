import React, { Component } from 'react';
import { withStyles, Table, TableBody, TableRow, TableCell, Avatar, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import AdminImage from '../../../assets/images/admin.png';

const styles = theme => ({
    avatar: { width: 100, height: 100 },
    GridContainer: { marginTop: "20px", [theme.breakpoints.down('md')]: { marginTop: "45px" } },
    table: { minWidth: 500 },
    tableHeading: { border: '1px solid #000', height: '30px', textAlign: 'center' },
    tableCell: { border: '1px solid #000', height: '30px', textAlign: 'left' },
})

class VewParentDetails extends Component {
    render() {
        const { firstName, lastName, cellNumber, aadharNumber, occupation, qualification, image, title } = this.props.data;
        const { classes } = this.props;
        return (
            <Grid container className={classes.GridContainer}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan="2" className={classes.tableHeading}> <h3>{title}</h3> </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>First Name  </TableCell>
                                        <TableCell className={classes.tableCell}>{firstName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Last Name  </TableCell>
                                        <TableCell className={classes.tableCell}>{lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Cell Number  </TableCell>
                                        <TableCell className={classes.tableCell}>{cellNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>AAdhar Number  </TableCell>
                                        <TableCell className={classes.tableCell}>{aadharNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Occupation  </TableCell>
                                        <TableCell className={classes.tableCell}>{occupation}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Qualification  </TableCell>
                                        <TableCell className={classes.tableCell}>{qualification}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Image  </TableCell>
                                        <TableCell className={classes.tableCell}><Avatar alt="No Images" src={image === null ? AdminImage : "data:image/jpeg;base64," + image} className={classes.avatar}/></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(styles, { withTheme: true })(VewParentDetails);

