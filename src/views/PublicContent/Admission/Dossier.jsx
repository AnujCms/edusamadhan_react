import React from 'react';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';
import PDFViewer from 'pdf-viewer-reactjs';
import { Helmet } from "react-helmet";
import axios from 'axios';

const styles = theme => ({
    root: {
        margin: theme.spacing(0),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    center: { textAlign: "center", fontWeight: 900, fontSize: "25px !important", paddingTop: "20px" },
    formHeader: { margin: "0px", height: "70px", width: "100%", background: theme.palette.formcolor.backgroundHeader, color: theme.palette.formcolor.textColor },
    marginStyle: { marginTop: "5px" },
    login: { width: "100%", marginTop: "50px", cursor: "pointer", [theme.breakpoints.down('md')]: { marginLeft: 0, paddingTop: '15px' } }
});

class Dossier extends React.Component {
    state = { dossierUrl: '', isRender: false, errorMessage: '' }
    componentDidMount = () => {
        let accountId = 'eac1efd0-ce2d-11ea-9b0d-21e50464571f'
        axios.get('/api/publiccontent/getPublicContentUrl/' + accountId + "/" + 1).then(response => {
            if (response.data.status === 1) {
                this.setState({ isRender: true, dossierUrl: response.data.statusDescription[0].contentUrl })
            } else if (response.data.status === 0) {
                this.setState({ isRender: false, isError: true, errorMessage: response.data.statusDescription })
            }
        })
    }
    render() {
        const { classes } = this.props;
        const { isRender, dossierUrl, errorMessage } = this.state;
        return (
            <div className={classes.root}>
                <Helmet> <title>Dossier</title></Helmet>
                <Paper className={classes.formHeader}>
                    <Typography className={classes.center}>Dossier</Typography>
                </Paper>
                {isRender ?<Grid container>
                    <Grid item lg={12} md={12} xs={12} sm={12} className={classes.marginStyle}>
                        <PDFViewer
                            document={{
                                url: dossierUrl
                            }}
                        />}
                    </Grid>
                </Grid>: <Typography variant="h4" style={{ textAlign: 'center', color: "red", marginTop: "20px" }}>{errorMessage}</Typography>}
            </div>
        )
    }
}

export default (withStyles(styles)(Dossier));
