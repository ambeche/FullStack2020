import { makeStyles, createTheme } from '@material-ui/core';

export const theme = createTheme({
  breakpoints: {
    values: {
      xxxs: 0,
      xxs: 354,
      xs: 360,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

const useStyles = makeStyles(
  (theme) => ({
    app: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      '& $loginOrRegisterContainer': {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        padding: theme.spacing(3),
        '& $loginOrRegister': {
          padding: theme.spacing(5),
          flex: '0 1 auto'
        },
        '& $loginScreenIcons': {
          padding: theme.spacing(0.5)
        },
        '& strong': {
          fontSize: '2em',
          boxShadow: `4px 4px 1px 1px ${theme.palette.primary.main}`,
          [theme.breakpoints.up('xs')]: {
            padding: theme.spacing(0, 18, 1, 0)
          }
        }
      }
    },
    loginOrRegister: {},
    loginOrRegisterContainer: {},
    loginScreenIcons: {},
    appInnerContainer: {
      marginBottom: theme.spacing(8)
    },
    appBar: {
      marginBottom: '3%',
      flexGrow: 1
    },
    desktopView: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    appBarEnd: {
      [theme.breakpoints.between('md', 'lg')]: {
        marginLeft: theme.spacing(40)
      },
      [theme.breakpoints.up('lg')]: { marginLeft: theme.spacing(80) }
    },
    appBarTab: {
      backgroundColor: theme.palette.primary.light,
      boxShadow: `4px 4px 1px 1px ${theme.palette.secondary.light}`,
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: '0 0 0 0'
      }
    },
    searchBar: {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: theme.spacing(2),
      justifyContent: 'center',
      backgroundColor: theme.palette.primary.light,
      '& h6': {
        flex: '0.2 1 auto',
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(1.3),
        color: theme.palette.background.paper
      },
      '& $searchBarMoreIcon': {
        marginRight: 32,
        color: theme.palette.background.paper
      }
    },
    searchMenu: { maxHeight: '60%' },
    searchOptionsTitle: {
      backgroundColor: theme.palette.primary.light,
      '&:hover': { backgroundColor: theme.palette.primary.light },
      '& h6': {
        color: '#fff'
      }
    },
    searchBarMoreIcon: {},
    searchBarTitle: {},
    searchBox: {
      flex: '1 1 auto',
      display: 'flex',
      flexFlow: 'row'
    },
    searchInput: {
      flex: 1,
      padding: theme.spacing(1.5)
    },
    searchIcon: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    appName: {
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(6),
        marginLeft: theme.spacing(1.5)
      },
      [theme.breakpoints.only('sm')]: {
        marginLeft: '55%'
      },
      [theme.breakpoints.only('xs')]: {
        marginLeft: '30%'
      },
      textDecoration: 'none'
    },
    menuIcon: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    menuItemProfile: {
      marginRight: theme.spacing(0)
    },
    forms: {
      '& div': {
        marginBottom: theme.spacing(1)
      }
    },
    centerBlogForm: {
      '& div': {
        display: 'block'
      },
      '& button': {
        display: 'block',
        margin: 'auto'
      }
    },
    formSubmitBtn: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(0.5)
    },
    formTitle: {
      marginBottom: theme.spacing(2)
    },
    blogTopicsInput: {},
    // checkboxes: blog addition form
    blogTopicsCheckBoxes: {
      display: 'flex',
      flexFlow: 'row wrap',
      border: '0.5px solid',
      padding: 16,
      '& $checkBoxIcon': {
        display: 'none'
      },
      '& $checkedBoxLabel': {
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
        textAlign: 'center',
        paddingRight: 10,
        borderRadius: 8
      }
    },
    checkBoxIcon: {},
    checkedBoxLabel: {},
    checkBoxLabel: { margin: 10 },
    commentForm: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      '& button': {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1)
      }
    },
    commentSection: {
      padding: theme.spacing(3),
      border: `0.5px solid ${theme.palette.primary.main}`
    },
    commentContainer: {
      padding: theme.spacing(0.3)
    },
    commentInnerContainer: {
      padding: 10,
      marginBottom: theme.spacing(2),
      backgroundColor: '#e1f5fe',
      overflowWrap: 'break-word'
    },
    commentText: {},
    roundedCornersBox: {
      borderRadius: 8
    },
    blogListContainer: {
      paddingBottom: 24
    },
    blogGrid: {
      display: 'grid',
      marginTop: '4%',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto auto'
      }
    },
    blogCard: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '4%',
      [theme.breakpoints.up('md')]: {
        margin: '3% 1.5% 1% 1.5%',
        maxWidth: '94%'
      }
    },
    blogMedia: {
      [theme.breakpoints.up('sm')]: { padding: '3% 0 0 0' },
      '& img': {
        height: 140,
        maxWidth: '100%',
        objectFit: 'contain',
        [theme.breakpoints.up('sm')]: { objectPosition: '0 0%' },
        [theme.breakpoints.down('sm')]: {
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          display: 'block'
        }
        //objectPosition: '0 0%'
      }
    },
    blogContentContainer: { flex: 1 },
    blogContent: {
      textDecoration: 'none'
    },
    blogContentText: {
      color: theme.palette.text.primary,
      padding: '1% 2% 1% 3%'
    },
    blogCardSecondaryActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 24,
      '& $commentBadge': {
        //marginRight: 100,
        color: theme.palette.secondary.dark
      }
    },
    commentBadge: {},
    bookmarkIcon: { color: theme.palette.primary.dark },
    blogContentDescription: {},
    scrollableBox: (props) => ({
      padding: props ? 8 : 16,
      maxHeight: props.maxHeight || 450,
      overflow: 'auto'
    }),
    commentListContainer: {},
    listSecondaryActionsDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        padding: theme.spacing(1),
        '& button': {
          marginLeft: theme.spacing(2)
        }
      }
    },
    listSecondaryActionsMobile: {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      },
      padding: theme.spacing(1),
      '& button': {
        marginLeft: theme.spacing(4)
      }
    },
    isLiked: {},
    listItemPrimary: {
      maxWidth: theme.spacing(35)
    },
    profile: {
      '& h6': {
        marginTop: '4%'
      },
      '& strong': {
        fontWeight: 'bold',
        marginRight: '10%'
      }
    },
    userDetails: {
      '& h6': {
        marginTop: '2%'
      }
    },
    formsContainerComponent: {
      marginBottom: '3%',
      '& $secondaryActionBtn': {}
    },
    secondaryActionBtn: {
      color: theme.palette.secondary.dark
    },
    footer: {
      backgroundColor: theme.palette.primary.light,
      marginTop: 'auto',
      '& $footerSiteMap': {
        color: theme.palette.text.primary
      }
    },
    footerSiteMap: {},
    footerGridItems: {
      padding: theme.spacing(5)
    },
    footerCopyrightContainer: {
      paddingBottom: theme.spacing(1.3)
    },
    footerCopyrightInnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(0.8)
    },
    footerCopyrightText: {
      textAlign: 'center',
      marginTop: theme.spacing(0.5)
    },
    footerPrivacyPolicy: {
      color: theme.palette.primary.dark,
      marginLeft: theme.spacing(1)
    },
    footerMediaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper
    },
    footerMediaInnerContainer: {
      flex: '0 3 auto'
    },
    footerMediaIcons: {
      marginRight: theme.spacing(2)
    },
    footerDeveloperInfo: {
      flex: '0 3 auto'
    },
    secondary: {},
    dialog: {},
    dialogTitle: {
      textAlign: 'center',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.background.paper
    },
    dialogActions: {
      justifyContent: 'center',
      '& button': {
        padding: theme.spacing(1)
      }
    },
    closeIcon: {
      marginRight: theme.spacing(1)
    }
  }),
  // this fixes a bug that occurs durring pdt/deployment build by webpack; indexing conflict in the mui classess;
  { index: 1 }
);

export default useStyles;
