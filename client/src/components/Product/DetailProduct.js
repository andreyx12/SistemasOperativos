import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CommentsProduct from '../Product/CommentsProduct';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Constants from '../Utils/Constants';
import { withStyles } from "@material-ui/core/styles";
import ProductsDAO from '../Product/ProductsDao';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    buttonPadding: {    
        padding: '30px',   
  },

});

class DetailProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            commentsLoading: true,
            num: '',
            num2: '',
            result: '',
            amount: '', 
        };
        this.onClickSendComment = this.onClickSendComment.bind(this);
        this.createCommentSuccessCalback = this.createCommentSuccessCalback.bind(this);
        this.getComments = this.getComments.bind(this);
        this.getCommentsSuccessCalback = this.getCommentsSuccessCalback.bind(this);
        this.socketGetNewComment = this.socketGetNewComment.bind(this);
        this.handlenumChange = this.handlenumChange.bind(this);
        this.addAction = this.addAction.bind(this); 
        this.getProductsUpdateResponse = this.getProductsUpdateResponse.bind(this)
    }

    componentDidMount() {
        window.$socket.on(Constants.UPDATE_COMMENTS_ON, this.socketGetNewComment);
        this.getComments();
    }

    socketGetNewComment(data) {
        this.setState({
            comments: this.state.comments.concat(data.comment)
        })
    }

    getComments = () => {
        ProductsDAO.GetCall(`/product/${this.props.selectedProduct._id}/comments`, this.getCommentsSuccessCalback);
    }

    getCommentsSuccessCalback = (response) => {
        if (response.status === 200) {
            this.setState({
                comments: response.data,
                commentsLoading: false
            })
        }
    };

    onClickSendComment = (input) => {
        let data = {
            id: this.props.selectedProduct._id,
            comment: input.current.value
        }
        ProductsDAO.postComment("/product/create/comment", data, this.createCommentSuccessCalback);
    };

    createCommentSuccessCalback = (response) => {
        if (response.status === 200) {
            window.$socket.emit(Constants.UPDATE_COMMENTS_EMIT, {comment: response.data.comment});
        }
    };

    addAction=(response)=>{
        let b = this.props.selectedProduct.amount.$numberDecimal
        let x = Number(this.state.num) + Number(b)
        this.setState({result: x })
        console.log('resultado', x);

        let data = {  
            id: this.props.selectedProduct._id,
            amount: x.toString()
        }

        console.log(data); 
        ProductsDAO.updateProduct("/product/update/amount", data, this.getProductsUpdateResponse);       
        document.getElementById('amount').innerHTML = 'Precio Actual: $' + x; 
    }

    handlenumChange (evt) {
        console.log(evt.target.value);
        this.setState({ num: Number(evt.target.value) });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            openSuccessMessage: false
        })    
    };

      getProductsUpdateResponse(response) {   
        if (response.status === 200) {
            console.console.log(response);                      
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item align="center" md={12} xs={12}>
                    <Card className={this.props.classes.root}>
                        <CardMedia
                            className={this.props.classes.media}
                            image={"/uploads/" + this.props.selectedProduct.imagePath}
                            title="Paella dish"
                        />
                    </Card>
                </Grid>
                <Grid item md={6} xs={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                              <div id="amount">
                              Precio Actual: ${this.props.selectedProduct.amount.$numberDecimal}
                             </div>
                            </Typography>
                            <Typography>
                                Nombre del producto: {this.props.selectedProduct.name}
                            </Typography>
                            <Typography>
                                Detalle: {this.props.selectedProduct.description}
                            </Typography>
                            <Typography>
                                Expiración: {new Date(this.props.selectedProduct.expirationDate).toLocaleDateString('en-GB')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={6} xs={6}>
                    <Card>
                        <CardContent>
                            <TextField
                                label="Ingrese el monto a pujar"
                                type="number"
                                name="amount"
                                fullWidth
                                variant="outlined"
                                className={this.props.classes.textField}
                                onChange={this.handlenumChange}
                                value={this.state.num}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Box mt={1.5} mb={-0.1} >
                                <Button
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    className={this.props.classes.btnAccept}
                                    onClick={this.addAction} 
                                    value="Add"
                                    startIcon={<MonetizationOnIcon />}
                                >
                                    Pujar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Snackbar onClose={this.handleClose} open={this.state.openSuccessMessage} autoHideDuration={3000}>
                    <Alert onClose={this.handleClose} severity="success">
                        ¡Puja realizada exitósamente!
                    </Alert>
                </Snackbar>
                <Grid item md={12} xs={12}>
                    { this.state.commentsLoading ?
                        <Grid container justify='center' alignItems='center'>
                            <CircularProgress size={60} color="secondary"/>
                        </Grid>
                        :
                        <CommentsProduct onClickSendComment={this.onClickSendComment} comments={this.state.comments}></CommentsProduct>
                    }
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(DetailProduct);