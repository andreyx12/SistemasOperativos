
import React from 'react';
import ProductElement from './ProductElement';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginPagination: {
      marginTop: 20,
    },
  }),
);

function ProductList(props) {

    console.log(props)
    const classes = useStyles();
    let elementsPaginationSize = props.paginationSize > 0 ? true : false;
    let elementsSize = props.elements.length > 0 ? true : false;
    return(
        <div>
            {elementsSize ?
            <div>
                <Grid container justify="center" spacing={3}>
                    {props.elements.map((value, index)=>(
                        <Grid item m={3} key={index}>
                            <ProductElement key={value._id} data={value} onClickDetailValue={props.onClickDetailValue}></ProductElement>
                        </Grid>
                    ))}
                </Grid>
                <Grid className={classes.marginPagination} container justify="center" spacing={3}>
                    <Pagination onChange={props.onChangePagination} count={props.paginationSize} />
                </Grid>
            </div>
             : 
             <Grid container justify="center" alignItems="center">
                    <Grid item m={12}>
                        <h1>- No hay registros para mostrar -</h1>
                    </Grid>
            </Grid> }
        </div>
      );
}

export default ProductList