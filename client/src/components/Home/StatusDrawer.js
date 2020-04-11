import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = 300;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
          display: "none"
        },
      },
    drawerPaper: {
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
        },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

function StatusDrawer(props) {

    const classesDrawer = useStyles();
    const statusActivitiesSize = props.activityStatusDrawer.length;

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
  
    const handleClick = (e) => {
      
    };

    return (
        <Drawer
            className={classesDrawer.drawer}
            variant="permanent"
            anchor="right"
            classes={{
                paper: classesDrawer.drawerPaper,
            }}
            >
            <div  />
            <Divider />
            <List>
                <ListItem>
                  <ListItemText primary={"Usuarios conectados:"} />
                  <ListItemText>
                        <Typography component="div">
                          <Box fontWeight="fontWeightBold">
                            {props.connectedUsers}
                          </Box>
                        </Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText>
                        <Typography component="div">
                          <Box fontWeight="fontWeightBold">
                          Actualizaciones
                          </Box>
                        </Typography>
                    </ListItemText>
                </ListItem>
                {statusActivitiesSize > 0 ?
                    props.activityStatusDrawer.map((text, index) => (
                      <ListItem key={index}>
                        <Slide 
                        in={true}
                        timeout={1000}
                        direction='left'
                        >
                          <Chip
                              label={text}
                              variant="outlined"
                              color="primary"
                              onClick={handleToggle}
                              onDelete={e => props.onDeleteStatusValue(text)}
                            />
                        </Slide>
                    </ListItem>
                    ))
                  :
                  <ListItem>
                    <ListItemText>
                        <Typography component="div">
                          <Box fontWeight="fontWeightLight" textAlign="center" m={1}>
                          - No hay novedades -
                          </Box>
                        </Typography>
                    </ListItemText>
                </ListItem>
              }
            </List>
            <Backdrop className={classesDrawer.backdrop} open={open} onClick={handleClose}>
              <CircularProgress color="inherit" />
          </Backdrop>
        </Drawer>
    );
}

export default StatusDrawer