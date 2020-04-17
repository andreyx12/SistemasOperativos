import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles, fade } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListContent from '../Homex/ListContent';
import { withRouter } from 'react-router';
import AddProduct from '../Product/AddProduct';
import DetailProduct from '../Product/DetailProduct';
import Button from '@material-ui/core/Button';
import ProductList from '../Product/ProductList';
import ProductsDAO from '../Product/ProductsDao';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MobileMenu from '../Home/MobileMenu';
import StatusDrawer from '../Home/StatusDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import * as Constants from '../Utils/Constants';
import 'font-awesome/css/font-awesome.min.css';
import Laptop from '@material-ui/icons/Laptop';

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginRight: drawerWidth,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      loader: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
});

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            componentToRender: Constants.HOME_ROUTE,
            data: [],
            selectedProduct: {},
            paginationSize: 0,
            showLoading: true,
            retryFlag: false,
            connectedUsers: '',
            activityStatusDrawer: ['Auto de carreras vendido', 'Set de mesa con sillas de baño vendido']
        };
        this.onItemClickHandler = this.onItemClickHandler.bind(this)
        this.getProductsResponse = this.getProductsResponse.bind(this)
        this.getProductsUpdateResponse = this.getProductsUpdateResponse.bind(this)
        this.socketUpdateElementCounter = this.socketUpdateElementCounter.bind(this)
        this.socketTotalConnectedUsers = this.socketTotalConnectedUsers.bind(this)
        this.onDeleteStatusValue = this.onDeleteStatusValue.bind(this)
    }

    componentDidMount() {
      window.$socket.on(Constants.UPDATE_VIEWS_ON, this.socketUpdateElementCounter);
      window.$socket.on(Constants.CONNECTED_USERS_ON, this.socketTotalConnectedUsers);
      ProductsDAO.fetchProducts(Constants.GET_PRODUCTS_URL, this.getProductsResponse);
    }

    socketTotalConnectedUsers (data) {
      this.setState({
        connectedUsers: data.connectedUsers
      })
    }

    getProductsResponse (response) {
      console.log(response)
      if (response.status === 200) {
        this.setState({
          data: response.data.productList,
          paginationSize: response.data.productCount,
          showLoading: false
        })
      } else {
        this.setState({
          retryFlag: true
        })
      }
    }

    getProductsUpdateResponse (response) {
      if (response.status === 200) {
        window.$socket.emit(Constants.UPDATE_VIEWS_EMIT, {id: response.data.updatedDocument._id, views: response.data.updatedDocument.views});
      }
    }

    onItemClickHandler = (val) => {
        this.setState({componentToRender: val})
        /* Si se selecciona la primera opcion otra vez, se vuelve a consultar al servicio */
        if (val == Constants.HOME_ROUTE ) {
          this.setState({showLoading: true})
          ProductsDAO.fetchProducts(Constants.GET_PRODUCTS_URL, this.getProductsResponse);
        }
    }

    onChangePagination = (event, page) => {
        console.log(page)
        //ProductsDAO.fetchProducts(Constants.GET_PRODUCTS_URL, this.getProductsResponse);
    }

    socketUpdateElementCounter = (data) => {
      //console.log(data)
      this.setState({
          data: this.state.data.map(el => (el._id === data.id) ? { ...el, views: data.views} : el)
      });
    }

    onClickDetailValue = (selectedProduct) => {
      // var currentState = this.state.activityStatusDrawer;
      // currentState.push("holi")
      // this.setState({
      //   activityStatusDrawer: currentState
      // });

      this.setState({
        componentToRender: Constants.ABOUT_ROUTE,
        selectedProduct: selectedProduct
      });

      ProductsDAO.updateProduct(Constants.UPDATE_VIEWS_COUNTER_URL, {id: selectedProduct._id}, this.getProductsUpdateResponse);
    }

    onDeleteStatusValue = (e) => {

      let filteredArray = this.state.activityStatusDrawer.filter(item => item !== e)

      this.setState({
        activityStatusDrawer: filteredArray
      });
    }

    render() {

        return (          
            <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={this.props.classes.appBar}>
              <Toolbar>
              <Laptop ></Laptop>
                <Typography variant="h6" className={this.props.classes.title}>
                &nbsp; Proyecto Sistemas Operativos
                </Typography>
                {/* <div className={this.props.classes.search}>
                  <div className={this.props.classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: this.props.classes.inputRoot,
                      input: this.props.classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div> */}
                <div className={this.props.classes.sectionMobile}>
                  <Button onClick={e => this.onItemClickHandler(Constants.HOME_ROUTE)} color="inherit">Home<HomeIcon></HomeIcon></Button>
                  <Button onClick={e => this.onItemClickHandler(Constants.ADD_ROUTE)} color="inherit">Agregar</Button>
                  <Button onClick={e => this.onItemClickHandler(Constants.ABOUT_ROUTE)} color="inherit">Acerca</Button>
                  <Button onClick={e => this.onItemClickHandler(Constants.EXIT_ROUTE)} color="inherit">Salir</Button>
                </div>
                <MobileMenu/>
              </Toolbar>
            </AppBar>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                {(() => {
                  switch (this.state.componentToRender) {
                    
                    case Constants.HOME_ROUTE:
                      return this.state.showLoading ?
                        <Grid container justify='center' alignItems='center'>
                          <CircularProgress size={80} color="secondary"/>
                        </Grid>
                      : <ProductList onClickDetailValue={this.onClickDetailValue} onChangePagination={this.onChangePagination} elements={this.state.data} paginationSize={this.state.paginationSize}></ProductList>;
                      
                    case Constants.ADD_ROUTE:
                      return <AddProduct></AddProduct>;

                    case Constants.ABOUT_ROUTE:
                        return <DetailProduct selectedProduct={this.state.selectedProduct}></DetailProduct>;

                    default:
                      return <ListContent></ListContent>;
                  }
                })()}
            </main>
            <StatusDrawer
              connectedUsers={this.state.connectedUsers}
              activityStatusDrawer={this.state.activityStatusDrawer}
              onDeleteStatusValue={this.onDeleteStatusValue}
            >
            </StatusDrawer>
          </div>
        );
    }
}
  
export default withStyles(styles)(withRouter(Home));