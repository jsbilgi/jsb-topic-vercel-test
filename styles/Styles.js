import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

export const drawerStyles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    grow: {
      flexGrow: 1,
    },
  });
  

  export const appTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Poppins',
      ].join(','),
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#fff',
        // main: '#5c6bc0',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#010101',
      }
    },
  });
  
  export const nightModeTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Poppins',
      ].join(','),
    },
    palette: {
      type: 'dark',
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#424242',
        // main: '#5c6bc0',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      }
    },
});

export const gridStyles = theme => ({
  root: {
    flexGrow: 1,
  }
});

export const cardStyles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
});

export const readerTabsStyles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inputRoot: {
    display: 'flex',
    alignItems: 'center',
    margin: '0px 24px 24px 24px'
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: '0.8rem',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 20,
    margin: 4,
  },
});