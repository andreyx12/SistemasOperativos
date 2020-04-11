import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ProductsDAO from '../Product/ProductsDao';
import * as Constants from '../Utils/Constants';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    btnAccept: {
        backgroundColor: 'gray'
    }
});

class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            expirationDate: '',
            imageFile: '',
            openSuccessMessage: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createProductSuccessCallback = this.createProductSuccessCallback.bind(this);
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'imageFile':
              this.setState({ imageFile: e.target.files[0] });
              break;
            default:
              this.setState({ [e.target.name]: e.target.value });
        }
    }

    createProductSuccessCallback(response) {   
        if (response.status === 200) {
            document.getElementById("imageFileId").value = null;
            this.setState({
                name: '',
                description: '',
                expirationDate: '',
                imageFile: '',
                openSuccessMessage: true
            })
        }
    }

    onSubmit = (e) => {

        e.preventDefault();
        const { name, description, expirationDate, imageFile, } = this.state;
        let formData = new FormData();
  
        formData.append('name', name);
        formData.append('description', description);
        formData.append('expirationDate', expirationDate);
        formData.append('imageFile', imageFile);

        ProductsDAO.createProduct(Constants.CREATE_PRODUCT_URL ,formData, this.createProductSuccessCallback);
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            openSuccessMessage: false
        })
    };

    render() {
        // onSubmit={this.handleSubmit} 
        return (
            <form onSubmit={this.onSubmit}>
                <Grid container spacing={3}>
                    <Grid item align="center" xs={12}>
                        <h1>Agregar producto</h1>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                                label="Imagen"
                                type="file"
                                id="imageFileId"
                                name="imageFile"
                                required={true}
                                variant="outlined"
                                fullWidth
                                className={this.props.classes.textField}
                                onChange={this.handleChange} 
                                inputProps={{ accept: 'image/x-png,image/gif,image/jpeg'}} 
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                                label="Nombre"
                                type="text"
                                name="name"
                                fullWidth
                                required={true}
                                variant="outlined"
                                className={this.props.classes.textField}
                                onChange={this.handleChange} 
                                value={this.state.name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    maxLength: 30,
                                }}
                            />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                                label="Descripción"
                                type="text"
                                name="description"
                                fullWidth
                                required={true}
                                variant="outlined"
                                className={this.props.classes.textField}
                                onChange={this.handleChange} 
                                value={this.state.description}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                    </Grid>
                    <Grid item xs={12} md={6}>
                         <TextField
                            label="Fecha de expiración"
                            type="date"
                            fullWidth
                            value={this.state.expirationDate}
                            required={true}
                            variant="outlined"
                            name="expirationDate"
                            onChange={this.handleChange} 
                            className={this.props.classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item align="center" xs={12}>
                        <Button
                            type='submit'
                            variant="contained"
                            color="primary"
                            size="large"
                            required={true}
                            className={this.props.classes.btnAccept}
                            startIcon={<SaveIcon />}
                        >
                            Crear
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar onClose={this.handleClose} open={this.state.openSuccessMessage} autoHideDuration={3000}>
                    <Alert onClose={this.handleClose} severity="success">
                        ¡Producto creado exitósamente!
                    </Alert>
                </Snackbar>
            </form>
        );
    }
}
  
export default withStyles(styles)(withRouter(AddProduct));