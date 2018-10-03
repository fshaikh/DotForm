import React from 'react'
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

import styles from './UserProfile.module.css';
import UserOptions from './UserOptions/UserOptions';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserSettings: false,
            anchorElement: null
        };
        this.onHandleClick = this.onHandleClick.bind(this);
    }

    render() {
        const profile = this.props.Profile;
        return (
            <div>
                <Avatar alt={profile.name}
                        src={profile.picture}
                        classes={{
                            img: styles.image
                        }}
                        onClick={(event) => this.onHandleClick(event)} />
                {this.state.showUserSettings ? <UserOptions Profile={profile} 
                                                            AnchorElement={this.state.anchorElement}
                                                            onClose={this.onHandleClick}/> : ''}
            </div>
        );
    }
    
    onHandleClick(event) {
        const target = event.currentTarget;
        this.setState((prevState) =>{
            return {
                showUserSettings: !prevState.showUserSettings,
                anchorElement: target
            }
        });
    }

    
}


UserProfile.propTypes = {
    Profile: PropTypes.object.isRequired
};

