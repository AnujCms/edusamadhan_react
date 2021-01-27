import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';
import MyPdf from './mydata.pdf';

const styles = theme => ({
    root: { marginTop: theme.spacing(12), maxWidth: "1250px", margin: "0 auto", [theme.breakpoints.down('md')]: { margin: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 } },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    marginStyle: { marginTop: "5px" },
    login: { width: "100%", marginTop: "50px", cursor: "pointer", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } }
});
 
class EducationSystem extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    const { classes } = this.props;

    return (
        <div className={classes.root}>
        <Document
          file={MyPdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}
export default (withStyles(styles)(EducationSystem));
