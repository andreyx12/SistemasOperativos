
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ProductsDAO from '../Product/ProductsDao';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    }
}));
  

function CommentsProduct(props) {

    const classes = useStyles();
    /* Referencia del input */
    let textInput = React.createRef();

    return (
    <List className={classes.root}>
        <ListItem alignItems="flex-start">
            <TextField
                placeholder="Ingrese un comentario..."
                multiline
                inputRef={textInput}
                fullWidth
                rows={2}
                rowsMax={4}
                InputProps={{
                    endAdornment: 
                    <InputAdornment position="end"> 
                        <IconButton onClick={() => props.onClickSendComment(textInput)} aria-label="delete">
                            <SendIcon color="primary" fontSize="large" />
                        </IconButton>
                    </InputAdornment>,
                }}
            />
        </ListItem>
        {props.comments.map((value, index)=>(
            <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={value.username} src="/" />
                </ListItemAvatar>
                <ListItemText
                primary={value.username}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {value.comment}
                    </Typography>
                    {" - " + new Date(value.createdDate).toLocaleString()}
                    </React.Fragment>
                }
                />
            </ListItem>
        ))}
    </List>
    );
}

export default CommentsProduct