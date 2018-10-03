import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';



function UserOptions(props) {
  return (
    <Menu
       anchorEl={props.AnchorElement}
       open={Boolean(props.AnchorElement)}
       onClose={props.onClose}
    >
        <MenuItem >Signed is as {props.Profile.nickname}</MenuItem>
        <Divider />
        <MenuItem >Sign out</MenuItem>
    </Menu>
  );
}

UserOptions.propTypes = {
    Profile: PropTypes.object.isRequired,
    AnchorElement: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
};

export default UserOptions;
