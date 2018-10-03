/**
 * React specific imports
 */
import React from 'react';

/**
 * Material UI specific imports
 */

import LoginSignupView from './LoginSignupView';
import AppContext from '../../../store/AppContext';
import UserProfile from './UserProfile/UserProfile';

const ActionBar = (props) => {
    return (
        <AppContext.Consumer>
            {(context) => {
               if(!context.AuthService.isAuthenticated()){
                   return <LoginSignupView />
               }else{
                   const profile =  context.AuthService.getProfile();
                   return <UserProfile Profile={profile} />
               }
            }}
        
        </AppContext.Consumer>
    );
};

export default ActionBar;
