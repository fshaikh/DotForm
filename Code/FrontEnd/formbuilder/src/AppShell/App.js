import React, { Component } from 'react';


import styles from './App.module.css';
import ApplicationBar from './ApplicationBar/ApplicationBar';
import CenterContent from './CenterContent/CenterContent';
import AppContext from '../store/AppContext'; 
import EventEmitter from '@reversecurrent/eventemitter/EventEmitter';
import * as Actions from '../Actions/Actions';
import AuthService from '../Services/Auth/AuthService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    // bind event handlers
    this.bindEventHandlers();
    // create event emitter and bind event handlers
    this.setupDispatcher();
  }
  render() {
    const context = this.getContext();

    return (
      <AppContext.Provider value={context}>  
        <div className={styles.appContainer}>
          <ApplicationBar />
          <CenterContent />
        </div>
      </AppContext.Provider>  
    );
  }

  /**
     * Bind event handlers
     */
    bindEventHandlers() {
      this.onLogin = this.onLogin.bind(this);
      this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
  }
  /**
     * Sets up dispatchers.
     */
    setupDispatcher() {
      this.eventEmitter = new EventEmitter('Form Builder',true);
      this.eventEmitter.on(Actions.Login, this.onLogin);
      this.eventEmitter.on(Actions.OnSuccessfulLogin,this.onSuccessfulLogin);
  }

  /**
     * Creates Form Designer context object
     */
    getContext() {
      return {
          eventEmitter: this.eventEmitter,
          AuthService: AuthService
      };
  }

  onLogin(){
    AuthService.login();
  }

  async onSuccessfulLogin(){
    const response = await AuthService.handlePostLogin();
    if(response.isSuccess) {
      this.setState((prevState) => {
        // navigate to myforms
        this.props.history.push('/myforms');
        return {isAuthenticated: true}
      });
      
    }
  }
}

export default App;
