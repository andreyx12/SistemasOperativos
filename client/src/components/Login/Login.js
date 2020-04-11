import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Login.css';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import AlertMessage from '../Utils/AlertMessage';


const styles = theme => ({
    chip: {
    //   fontSize: 20,
    //   color: 'red',
    //   borderStyle: "solid",
    //   padding: 10 
    },
});

class Login extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.match.params.session);
        console.log(this.props.match);
        this.state  = {
            disabledButton: false,
            showLoading: false,
            sessionFinished: this.props.match.params.session
        };
    }

    loginOnClick = () => {
        this.setState(() => {
            return {
                showLoading:true,
                disabledButton: true
            };
        });
        
        setTimeout(() => 
            this.props.history.push('/home'), 
        1000);
    }

    render() {
        return (
        <div className="login-body">
            <div className="login-card">
                <div className="content-card">
                    <Grid container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={24}>
                         {this.state.sessionFinished &&
                            <AlertMessage textAlert="Session Finished!"/>
                        }
                        <Grid item sm={12}>
                            <Typography variant="h5" component="h2">
                                Login
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                            id="userId"
                            autoFocus
                            fullWidth
                            label="User"
                            margin="normal"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                            id="passId"
                            fullWidth
                            label="Pass"
                            margin="normal"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <Button disabled={this.state.disabledButton} onClick={this.loginOnClick} variant="contained" color="primary">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                {this.state.showLoading &&
                    <LinearProgress />
                }
            </div>
        </div>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Login));