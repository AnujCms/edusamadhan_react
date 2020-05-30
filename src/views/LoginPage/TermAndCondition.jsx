import React from 'react';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 4,
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    linespacing:{
        marginBottom:"10px",
        textAlign: "justify"
    }
});

class TermAndCondition extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Term and Condition</title></Helmet>
                <Typography variant="h4" className={classes.linespacing}><b>Terms and Conditions</b></Typography>
                <Typography className={classes.linespacing}><b>Welcome to www.edusamadhan.com</b></Typography>
                <Typography className={classes.linespacing}>These terms and conditions outline the rules and regulations for the use of <b>EDUSAMADHAN's</b> Website, located at <b>http://edusamadhan.com</b>.</Typography>
                <Typography className={classes.linespacing}>By accessing this website we assume you accept these terms and conditions. Do not continue to use www.edusamadhan.com if you do not agree to take all of the terms and conditions stated on this page.</Typography>
                <Typography className={classes.linespacing}>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Typography>
                <Typography variant="h4" className={classes.linespacing}><b>Cookies</b></Typography>
                <Typography className={classes.linespacing}>We employ the use of cookies. By accessing www.edusamadhan.com, you agreed to use cookies in agreement with the <b>EDUSAMADHAN's</b> Privacy Policy.</Typography>
                <Typography className={classes.linespacing}>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</Typography>
                <Typography variant="h4" className={classes.linespacing}><b>License</b></Typography>
                <Typography className={classes.linespacing}>Unless otherwise stated, EDUSAMADHAN and/or its licensors own the intellectual property rights for all material on www.edusamadhan.com. All intellectual property rights are reserved. You may access this from www.edusamadhan.com for your own personal use subjected to restrictions set in these terms and conditions.</Typography>
                
                <Typography variant="h4" className={classes.linespacing}><b>You must not</b></Typography>
                <Typography className={classes.linespacing}><b>==></b> Republish material from <b>www.edusamadhan.com</b></Typography>
                <Typography className={classes.linespacing}><b>==></b> Sell, rent or sub-license material from <b>www.edusamadhan.com</b></Typography>
                <Typography className={classes.linespacing}><b>==></b> Reproduce, duplicate or copy material from <b>www.edusamadhan.com</b></Typography>
                <Typography className={classes.linespacing}><b>==></b> Redistribute content from <b>www.edusamadhan.com</b></Typography><br></br>
                <Typography className={classes.linespacing}>This Agreement shall begin on the date hereof</Typography><br></br>
                <Typography className={classes.linespacing}>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. <b>EDUSAMADHAN</b> does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of <b>EDUSAMADHAN</b>, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, <b>EDUSAMADHAN</b> shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</Typography><br />
                <Typography className={classes.linespacing}><b>EDUSAMADHAN</b> reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</Typography><br />
                
                <Typography className={classes.linespacing}><b>You warrant and represent that:</b></Typography>
                <Typography className={classes.linespacing}><b>*</b> You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</Typography>
                <Typography className={classes.linespacing}><b>*</b> The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</Typography>
                <Typography className={classes.linespacing}><b>*</b> The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</Typography>
                <Typography className={classes.linespacing}><b>*</b> The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</Typography>< br />
                <Typography className={classes.linespacing}>You hereby grant <b>EDUSAMADHAN</b> a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</Typography><br />
                
                <Typography className={classes.linespacing}><b>Hyperlinking to our Content</b></Typography>
                <Typography className={classes.linespacing}><b>*</b> The following organizations may link to our Website without prior written approval:</Typography>
                <Typography className={classes.linespacing}><b>*</b> Government agencies</Typography>
                <Typography className={classes.linespacing}><b>*</b> Search engines</Typography>
                <Typography className={classes.linespacing}><b>*</b> News organizations</Typography>
                <Typography className={classes.linespacing}>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses and</Typography>
                <Typography className={classes.linespacing}>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</Typography>
                <Typography className={classes.linespacing}>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</Typography><br />
                
                <Typography className={classes.linespacing}><b>We may consider and approve other link requests from the following types of organizations:</b></Typography>
                <Typography className={classes.linespacing}><b>*</b> Commonly-known consumer and/or business information sources</Typography>
                <Typography className={classes.linespacing}><b>*</b> Dot.com community sites</Typography>
                <Typography className={classes.linespacing}><b>*</b> Associations or other groups representing charities</Typography>
                <Typography className={classes.linespacing}><b>*</b> Online directory distributors</Typography>
                <Typography className={classes.linespacing}><b>*</b> Internet portals</Typography>
                <Typography className={classes.linespacing}><b>*</b> Accounting, law and consulting firms and</Typography>
                <Typography className={classes.linespacing}><b>*</b> Educational institutions and trade associations.</Typography>
                <Typography className={classes.linespacing}>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of <b>EDUSAMADHAN</b>; and (d) the link is in the context of general resource information.</Typography>
                <Typography className={classes.linespacing}>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</Typography><br />
                <Typography className={classes.linespacing}>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to <b>EDUSAMADHAN</b>. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</Typography><br />
               
                <Typography className={classes.linespacing}><b>Approved organizations may hyperlink to our Website as follows:</b></Typography>
                <Typography className={classes.linespacing}>By use of our corporate name or</Typography>
                <Typography className={classes.linespacing}>By use of the uniform resource locator being linked to or</Typography>
                <Typography className={classes.linespacing}>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</Typography>
                <Typography className={classes.linespacing}>No use of EDUSAMADHAN's logo or other artwork will be allowed for linking absent a trademark license agreement.</Typography><br />

                <Typography className={classes.linespacing} variant="h5"><b>I Frames</b></Typography>
                <Typography className={classes.linespacing}>Without prior approval and written permission, you may not create frames around our Web pages that alter in any way the visual presentation or appearance of our Website.</Typography><br />
                <Typography className={classes.linespacing} variant="h5"><b>Content Liability</b></Typography>
                <Typography className={classes.linespacing}>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</Typography><br />
                
                <Typography className={classes.linespacing} variant="h5"><b>Reservation of Rights</b></Typography>
                <Typography className={classes.linespacing}>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions</Typography><br />
                <Typography className={classes.linespacing} variant="h5"><b>Removal of links from our website</b></Typography>
                <Typography className={classes.linespacing}>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</Typography>
                <Typography className={classes.linespacing}>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</Typography><br />

                <Typography className={classes.linespacing} variant="h4"><b>Disclaimer</b></Typography>
                <Typography className={classes.linespacing}>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</Typography>
                <Typography className={classes.linespacing}><b>*</b> Limit or exclude our or your liability for death or personal injury.</Typography>
                <Typography className={classes.linespacing}><b>*</b> Limit or exclude our or your liability for fraud or fraudulent misrepresentation</Typography>
                <Typography className={classes.linespacing}><b>*</b> Limit any of our or your liabilities in any way that is not permitted under applicable law; or</Typography>
                <Typography className={classes.linespacing}><b>*</b> Exclude any of our or your liabilities that may not be excluded under applicable law.</Typography><br />
                <Typography className={classes.linespacing}>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</Typography><br />
                <Typography className={classes.linespacing}>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</Typography>
            </div>
        )
    }
}
export default withStyles(styles)(TermAndCondition);