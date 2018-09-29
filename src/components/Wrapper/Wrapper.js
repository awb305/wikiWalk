import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Callback from '../../Callback';
import Home from '../Pages/Home';
import auth0Client from '../../utils/Auth';
import jwt from 'jsonwebtoken';
import Sample from '../Sample';
import Results from '../Pages/Results';

class Wrapper extends React.Component {
  state = {
    userId: 'loggedOut',
    page: "home",
    lon: -80.8431,
    lat: 35.2271,
    
  };

  getId = () => {
    return new Promise((resolve, reject) => {
      let token = auth0Client.getIdToken();
      console.log(token);
      let decodedObj = jwt.decode(token);
      console.log(decodedObj);
      if (decodedObj !== null) {
        resolve(decodedObj);
      } else {
        reject(console.error());
      }
    });
  };

  setId = async () => {
    const loginId = await this.getId();
    console.log(loginId);
    this.setState({
      userId: loginId.sub
    });
  };

  retrieveCoords = () => {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        console.log(location.coords.accuracy);
        if (location.coords !== null) {
          resolve(location);
        } else {
          reject(console.error());
        }
      });
    });
  }

  setCoords = async () => {
    const location = await this.retrieveCoords();
    console.log(location);
    this.setState({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      page: "results"
    });
    return <Redirect to= '/' />;

  }
  


  logout = () => {
    auth0Client.signOut();
    this.setState({
      userId: 'loggedOut'
    })
  };




  componentDidMount() {
    if (this.state.userId === 'loggedOut') {
      this.setId();
    }
  };

  setPage = (page) => {
    this.setState({
      page: page
    })
  }; 

  render() {
    console.log(this.state.lat);
    console.log(this.state.lon);


    if(this.state.page === 'home'){
      return <Home logout = {
        this.logout
      } 
      userId = {this.state.userId}
      setCoords = {this.setCoords}
      setPage={this.setPage}
      /> ;
    }else if(this.state.page === 'results'){
      
      return<Results logout = {
        this.logout
      }
      userId={this.state.userId}
      setCoords={this.setCoords}
      lon={this.state.lon}
      lat={this.state.lat}
       ></Results>
    }
  }
}

export default Wrapper;