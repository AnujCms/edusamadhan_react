import React from 'react';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";

const styles = (theme) => ({
    root: {
        margin: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('md')]: { margin: 0 },
    },
    linespacing:{
        marginBottom:"10px",
        textAlign: "justify"
    }
});

class PrivacyPolicy extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Helmet> <title>Privacy Policy</title></Helmet>
                <Typography variant="h4" className={classes.linespacing}><b>Privacy Policy</b></Typography>
                <Typography className={classes.linespacing}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</Typography>
                <Typography className={classes.linespacing}>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</Typography>
                
                <Typography variant="h4" className={classes.linespacing}><b>Interpretation and Definitions</b></Typography>
                <Typography variant="h5" className={classes.linespacing}><b>Interpretation</b></Typography>
                <Typography className={classes.linespacing}>The words of which the initial letter is capitalized have meanings defined under the following conditions.</Typography>
                <Typography className={classes.linespacing}>The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Typography>

                <Typography variant="h5" className={classes.linespacing}><b>Definitions</b></Typography>
                <Typography className={classes.linespacing}><b>For the purposes of this Privacy Policy:</b></Typography>
                <Typography className={classes.linespacing}>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable. Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to <b>EDUSAMADHAN</b>.</Typography>
                <Typography className={classes.linespacing}>Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority. Account means a unique account created for You to access our Service or parts of our Service. Website refers to <b>EDUSAMADHAN</b>, accessible from <b>htttp://edusamadhan.com</b> Service refers to the Website.</Typography>
                <Typography className={classes.linespacing}><b>Country refers to: India</b></Typography><br></br>
                <Typography className={classes.linespacing}>Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Typography><br></br>
                <Typography className={classes.linespacing}>Third-party Social Media Service refers to any website or any social network website through which a User can log in or create an account to use the Service. Personal Data is any information that relates to an identified or identifiable individual.</Typography><br />
                <Typography className={classes.linespacing}>Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses. Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</Typography><br />

                <Typography variant="h4" className={classes.linespacing}><b>Collecting and Using Your Personal Data</b></Typography><br />
                <Typography variant="h5" className={classes.linespacing}><b>Types of Data Collected</b></Typography><br />
                <Typography className={classes.linespacing}><b>Personal Data</b></Typography>
                <Typography className={classes.linespacing}>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</Typography>
                <Typography className={classes.linespacing}><b>*</b> Email address</Typography>
                <Typography className={classes.linespacing}><b>*</b> First name and last name</Typography> 
                <Typography className={classes.linespacing}><b>*</b> Phone number</Typography> 
                <Typography className={classes.linespacing}><b>*</b> Address, State, Province, ZIP/Postal code, City</Typography> 
                <Typography className={classes.linespacing}><b>*</b> Usage Data</Typography> 

                <Typography variant="h5" className={classes.linespacing}><b>Usage Data</b></Typography>
                <Typography className={classes.linespacing}>Usage Data is collected automatically when using the Service.</Typography>
                <Typography className={classes.linespacing}>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</Typography>
                <Typography className={classes.linespacing}>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data. We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</Typography>

                <Typography variant="h5" className={classes.linespacing}><b>Tracking Technologies and Cookie</b></Typography>
                <Typography className={classes.linespacing}>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.</Typography><br />
                <Typography className={classes.linespacing}>Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</Typography><br />
                <Typography className={classes.linespacing}><b>Cookies: What Do They Do?</b></Typography>
                <Typography className={classes.linespacing}>We use both session and persistent Cookies for the purposes set out below:</Typography>
                
                <Typography className={classes.linespacing}><b>Necessary / Essential Cookies</b></Typography>
                <Typography className={classes.linespacing}><b>Type:</b> Session Cookies</Typography>
                <Typography className={classes.linespacing}><b>Administered by</b>: Us</Typography>
                <Typography className={classes.linespacing}><b>Purpose:</b> These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</Typography><br />

                <Typography className={classes.linespacing}><b>Cookies Policy / Notice Acceptance Cookies</b></Typography>
                <Typography className={classes.linespacing}><b>Type:</b> Persistent Cookies</Typography>
                <Typography className={classes.linespacing}><b>Administered by:</b> Us</Typography>
                <Typography className={classes.linespacing}><b>Purpose:</b> These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</Typography>

                <Typography className={classes.linespacing}><b>Functionality Cookies</b></Typography>
                <Typography className={classes.linespacing}><b>Type:</b> Persistent Cookies</Typography>
                <Typography className={classes.linespacing}><b>Administered by:</b> Us</Typography>
                <Typography className={classes.linespacing}><b>Purpose:</b> These Cookies identify if users have accepted the use of cookies on the Website.</Typography><br />
                <Typography className={classes.linespacing}>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy.</Typography><br />

                <Typography variant="h4" className={classes.linespacing}><b>Use of Your Personal Data</b></Typography>
                <Typography className={classes.linespacing}><b>The Company may use Personal Data for the following purposes:</b></Typography>
                <Typography className={classes.linespacing}>To provide and maintain our Service, including to monitor the usage of our Service.</Typography><br />
                <Typography className={classes.linespacing}><b>To manage Your Account:</b> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</Typography><br />
                <Typography className={classes.linespacing}><b>For the performance of a contract:</b> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</Typography><br />
                <Typography className={classes.linespacing}><b>To contact You:</b> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</Typography><br />
                <Typography className={classes.linespacing}>To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</Typography><br />
               
                <Typography className={classes.linespacing}><b>To manage Your requests:</b>To attend and manage Your requests to Us.</Typography>
                <Typography className={classes.linespacing}><b>We may share your personal information in the following situations:</b></Typography><br />
                <Typography className={classes.linespacing}><b>With Service Providers:</b> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to show advertisements to You to help support and maintain Our Service, to contact You, to advertise on third party websites to You after You visited our Service or for payment processing.</Typography><br/>
                <Typography className={classes.linespacing}><b>For Business transfers:</b> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.</Typography><br/>

                <Typography className={classes.linespacing}><b>With Affiliates:</b> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</Typography><br />
                <Typography className={classes.linespacing}><b>With Business partners:</b> We may share Your information with Our business partners to offer You certain products, services or promotions.</Typography>
                <Typography className={classes.linespacing}><b>With other users:</b> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see You name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</Typography><br />
                
                <Typography className={classes.linespacing} variant="h5"><b>Retention of Your Personal Data</b></Typography>
                <Typography className={classes.linespacing}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</Typography>
                <Typography className={classes.linespacing}>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</Typography><br />
                
                <Typography className={classes.linespacing} variant="h5"><b>Transfer of Your Personal Data</b></Typography>
                <Typography className={classes.linespacing}>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</Typography>
                <Typography className={classes.linespacing}>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</Typography>
                <Typography className={classes.linespacing}>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</Typography>

                <Typography className={classes.linespacing} variant="h4"><b>Disclosure of Your Personal Data</b></Typography><br />
                <Typography className={classes.linespacing} variant="h5"><b>Business Transactions</b></Typography>
                <Typography className={classes.linespacing}>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</Typography><br />

                <Typography className={classes.linespacing} variant="h5"><b>Law enforcement</b></Typography>
                <Typography className={classes.linespacing}>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</Typography><br />

                <Typography className={classes.linespacing} variant="h5"><b>Other legal requirements</b></Typography>
                <Typography className={classes.linespacing}><b>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</b></Typography>
                <Typography className={classes.linespacing}><b>*</b> Comply with a legal obligation</Typography>
                <Typography className={classes.linespacing}><b>*</b> Protect and defend the rights or property of the Company</Typography>
                <Typography className={classes.linespacing}><b>*</b> Prevent or investigate possible wrongdoing in connection with the Service</Typography>
                <Typography className={classes.linespacing}><b>*</b> Protect the personal safety of Users of the Service or the public</Typography>
                <Typography className={classes.linespacing}><b>*</b> Protect against legal liability</Typography><br />

                <Typography className={classes.linespacing} variant="h5"><b>Security of Your Personal Data</b></Typography>
                <Typography className={classes.linespacing}>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</Typography>
                <Typography className={classes.linespacing}>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</Typography><br />
            
                <Typography className={classes.linespacing} variant="h5"><b>Links to Other Websites</b></Typography>
                <Typography className={classes.linespacing}>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</Typography>
                <Typography className={classes.linespacing}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</Typography><br />

                <Typography className={classes.linespacing} variant="h5"><b>Changes to this Privacy Policy</b></Typography>
                <Typography className={classes.linespacing}>We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</Typography>
                <Typography className={classes.linespacing}>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</Typography><br />

                <Typography className={classes.linespacing} variant="h5"><b>Contact Us</b></Typography>
                <Typography className={classes.linespacing}>If you have any questions about this Privacy Policy, You can contact us:</Typography>
                <Typography className={classes.linespacing}><b>By email:</b> edusamadhana@gmail.com</Typography>
                <Typography className={classes.linespacing}><b>Mobile Number:</b> 8090047787, 9648340892</Typography>
            </div>
        )
    }
}
export default withStyles(styles)(PrivacyPolicy);