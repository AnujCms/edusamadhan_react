import {createMuiTheme } from "@material-ui/core/styles";


export default function newTheme(theme)
{

return createMuiTheme({
  custom:{
    loginBgImage: theme.loginBGImage,
    loginLogo : theme.loginLogo,
    navbarImage: theme.navbarImage,
    printDetailLogo: theme.printDetailLogo,
    printDetailLink: theme.printDetail,
    printDetailsQRCode: theme.printDetailsQRCode,
    printDetailsPhoneImage: theme.printDetailsPhoneImage,
    profilePic: theme.profilePic,
  },

    palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#fff"
    },
    secondary: {
      main: theme.secondaryColor,
    },
    primary: {
      // light : "#fff",
      dark: "",
      main: theme.primaryColor,
    },
    thirdColor:{
      main:theme.thirdColor
    },
    hoverPrimaryColor:{
      main: theme.hoverPrimaryColor
    },
    hoverSecondaryColor:{
      main: theme.hoverSecondaryColor
    },
    hoverThirdColor:{
      main:theme.hoverThirdColor
    },
    border:{
      primaryBorder:theme.primaryBorder,
      secondaryBorder:theme.secondaryBorder,
      thirdBorder:theme.thirdBorder,
      hoverPrimaryBorder:theme.hoverPrimaryBorder,
      hoverSecondaryBorder:theme.hoverSecondaryBorder,
      hoverThirdBorder:theme.hoverThirdBorder
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    button:{
      okButtonBackground:theme.okButtonBackground,
      okButtonHover:theme.okButtonHover
    },
    text: {
      textPrimaryColor:theme.textPrimaryColor,
      textSecondaryColor:theme.textSecondaryColor,
      textThirdColor:theme.textThirdColor,
      hoverTextPrimaryColor:theme.hoverTextPrimaryColor,
      hoverTextSecondaryColor:theme.hoverTextSecondaryColor,
      hoverTextThirdColor:theme.hoverTextThirdColor,
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "#515974",
      third:"#fff",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    formcolor:{
      backgroundHeader:"#8B0000",
      textColor:"#fff",
      fontSize: "25px",
      backgroundFullPage:"#ebecf5"

    },
    minWidthMenu:{
      minWidthMenu: theme.minWidthMenu
    },
    logbook:{
      logbookFasting:theme.logbookFasting,
      logbookNonFasting:theme.logbookNonFasting,
      logbookInsulin:theme.logbookInsulin,
      viewcoworker:theme.viewcoworker
    },
    graph:{
      bgcolor: theme.bgcolor,
      med1GraphStartColor: theme.med1GraphStartColor,
      med1Color: theme.med1Color,
      med1GraphEndColor: theme.med1GraphEndColor
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Roboto', 'Helvicta','Arial',sans-serif",
    button:{
      textTransform: "capitalize"
    }
  },
  overrides: {    
    MUIDataTable:
    {
    responsiveScroll:{
            "max-height": "100%", 
        }
    },
    MuiTableCell : 
    {
           root :
     {
        "padding" : "4px 15px 4px 16px"
    },
},
MUIDataTableToolbar : {
  titleText:{
    color : "#001C61",
    fontWeight: 900
  }
},
MUIDataTableHeadCell: {
  root: {
    color: "#fff",
    fontWeight: "bolder",
    background:"rgba(75, 123, 227, 1) !important",
    height:"55px"
  },
  sortActive:{
    color: "#93f26d"
  }
},
MuiTableFooter:{
  root:{
    background:"#55ACEE !important"
  }
},
MuiTableRow : {
    root :{
        '&:nth-of-type(odd)': {
            backgroundColor: "#F0F8FF",
        },
        '&:nth-of-type(even)': {
          backgroundColor: "#e4eef7",
      },
    },
    footer: {
      background:"rgba(75, 123, 227, 1) !important",
      "& > td > div": {
        padding:0,
        color:'#fff'
      }
    }
},
MuiFormHelperText:{
  root:{
    marginTop:0,
    minHeight:0
  }
}
  }
  })
}