import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const ProgressIndeterminate  = (props) => {
  return (
    <div>
      <LinearProgress />
    </div>
  );
}

ProgressIndeterminate.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ProgressIndeterminate;