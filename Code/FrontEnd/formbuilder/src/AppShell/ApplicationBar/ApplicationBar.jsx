/**
 * React specific imports
 */
import React from 'react';

/**
 * MAterial UI specific imports
 */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import styles from './ApplicationBar.module.css';
import ActionBar from './ActionBar/ActionBar'

const ApplicationBar = (props) => {
    return (
        <div className={styles.appBar}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <div className={styles.space} />
                    <ActionBar />
                </Toolbar>
            </AppBar>
        </div>
        
    );
};

export default ApplicationBar;
