import React, { Component } from 'react';
import Drawer from '../Common/Drawer';
import './Homex.css';
import * as Routes from '../Constants/Routes';
import  * as Storage from '../Utils/LocalStorageManager';
import  { setLocalStorage } from '../Utils/LocalStorageManager';
import { withRouter } from 'react-router';
import ListContent from './ListContent';

// Storage.setLocalStorage();
// setLocalStorage()
// Storage.setLocalStorage();
class Home extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        fetch("/json")
          .then(res => res.json())
          .then(
            (result) => {
             console.log(result)
            },
            (error) => {
                console.log(error)
            }
          )
      }
    

    render() {
        return (
        <div>
           <Drawer username="Andrey" content={<ListContent></ListContent>}>
           </Drawer>
        </div>
        );
    }
}
  
export default withRouter(Home);