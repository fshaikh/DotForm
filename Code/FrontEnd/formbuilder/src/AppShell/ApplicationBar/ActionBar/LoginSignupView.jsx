/**
 * React specific imports
 */
import React from 'react';

/**
 * Material UI specific imports
 */

import Button from '@material-ui/core/Button';


import * as LocalizationService from '../../../strings/LocalizationService';
import AppContext from '../../../store/AppContext';
import * as Actions from '../../../Actions/Actions';

const LoginSignupView = (props) => {
    const strings = LocalizationService.getString();
    return (
        <AppContext.Consumer>
            {(context) => {
               return <div>
                        <Button color="inherit" onClick={(event) => context.eventEmitter.dispatch(Actions.LoginAction('Login'))}
                                >{strings.Login}</Button>
                        <Button color="inherit">{strings.Signup}</Button>
                      </div>
            }}
        
        </AppContext.Consumer>
    );
};

export default LoginSignupView;
