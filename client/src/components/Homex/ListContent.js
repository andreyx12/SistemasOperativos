
import React, { Component } from 'react';
import SimpleTable from '../Utils/SimpleTable';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { addValue,editValue, removeValue } from "../Redux/Actions/index";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => {
    return { rows: state };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      addValue: value => dispatch(addValue(value)),
      removeValue: id => dispatch(removeValue(id)),
      editValue: value => dispatch(editValue(value)),
    };
  };

class ListContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: '',
            fat: ''
        };
        this.addValue = this.addValue.bind(this);
    }

    addValue(){
        const id = uuidv1();
        this.props.addValue({ id, name: this.state.name, calories: this.state.calories, fat: this.state.fat });
        this.setState({ name: "", calories: "", fat: "" });
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        return (
        <div>
            <Grid
            container
            direction="row" 
            style={{ marginBottom: 10 }}>
                <Grid item xs={2}>
                <TextField
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    label="Calories"
                    value={this.state.calories}
                    onChange={this.handleChange('calories')}
                    />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    label="Fat"
                    value={this.state.fat}
                    onChange={this.handleChange('fat')}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => this.addValue()} variant="contained">
                        Add
                    </Button>
                </Grid>
            </Grid>

            <SimpleTable rows={this.props.rows}/>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContent);