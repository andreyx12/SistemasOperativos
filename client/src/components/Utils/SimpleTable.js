import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { editValue, removeValue } from "../Redux/Actions/index";

const mapDispatchToProps = dispatch => {
  return {
    removeValue: id => dispatch(removeValue(id)),
    editValue: value => dispatch(editValue(value)),
  };
};

const mapStateToProps = state => {
  return { rows: state };
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(id, name, calories, fat) {
  id += 1;
  return { id, name, calories, fat };
}

const rows = [
  createData(1,'Frozen yoghurt', 159, 6.0),
  createData(2,'Ice cream sandwich', 237, 9.0),
  createData(3,'Eclair', 262, 16.0),
  createData(4,'Cupcake', 305, 3.7),
  createData(5,'Gingerbread', 356, 16.0),
];

class SimpleTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
        name: '',
        age: '',
        fat: '',
        edit: false
    };
    this.removeItem = this.removeItem.bind(this);
    this.editItemSelection = this.editItemSelection.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  removeItem(id) {
    this.props.removeValue(id);
  }

  editItemSelection(id) {
    this.setState({ edit: true});
  }

  editItem(id) {
    alert("editItem: " + id)
  }

  render() {
    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat (g)</TableCell>
              <TableCell>Carbs (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                  {this.state.edit &&
                     <TextField value={row.name}
                     />
                  }
                  {!this.state.edit &&
                     <label>{row.name}</label>
                  }
                  </TableCell>
                  <TableCell numeric>
                  {this.state.edit &&
                      <TextField value={row.calories}
                      />
                  }
                  {!this.state.edit &&
                     <label>{row.calories}</label>
                  }
                  </TableCell>
                  <TableCell numeric>
                  {this.state.edit &&
                      <TextField value={row.fat}
                      />
                  }
                  {!this.state.edit &&
                     <label>{row.fat}</label>
                  }
                  </TableCell>
                  <TableCell numeric>
                    {this.state.edit &&
                     <label>{row.carbs}</label>
                  }
                  {!this.state.edit &&
                     <label>{row.carbs}</label>
                  }
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => this.editItemSelection(row.id)} aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => this.removeItem(row.id)} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

SimpleTable.defaultProps = {
  rows: rows
};

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(SimpleTable));