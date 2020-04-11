import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    alertMessage: {
        color: 'red',
    },
});

class SessionFinished extends Component {

    constructor(props) {
        super(props)
        this.state  = {
            in: true,
        };
        this.init = this.init.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.init();
    }

    init(){
        this.hideAlert();
    }

    hideAlert() {
        setTimeout(() => 
            this.setState(() => {
                return {
                    in:false                
                };
            })
        ,2000);
    }

    render() {
        return (
            <div>
                {this.state.in &&
                    <div className={this.props.classes.alertMessage}>{this.props.textAlert}</div>
                }
            </div>
        );
    };
};

export default withStyles(styles, { withTheme: true })(SessionFinished);