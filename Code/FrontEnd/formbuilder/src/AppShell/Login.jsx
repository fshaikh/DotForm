import React from 'react';
import AppContext from '../store/AppContext';
import * as Actions from '../Actions/Actions';

const Login = (nextState, replace) => {
    return (
        <AppContext.Consumer>
           {(context) => {
               console.log(context)
                if (/access_token|id_token|error/.test(nextState.location.hash)) {
                    //dispatch Successful login action
                    context.eventEmitter.dispatch(Actions.OnSuccessfulLoginAction(''));
                    return <h2>Logging user ...</h2>
                  }
            
            }}
        </AppContext.Consumer>
    );  
};

export default Login;