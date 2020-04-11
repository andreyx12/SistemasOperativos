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

const styles = theme => ({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class DetailProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            commentsLoading: true
        };
        this.onClickSendComment = this.onClickSendComment.bind(this);
        this.createCommentSuccessCalback = this.createCommentSuccessCalback.bind(this);
        this.getComments = this.getComments.bind(this);
        this.getCommentsSuccessCalback = this.getCommentsSuccessCalback.bind(this);
        this.socketGetNewComment = this.socketGetNewComment.bind(this);
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
                <Grid item md={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                              Valor inicial: ${this.props.selectedProduct.amount.$numberDecimal}
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