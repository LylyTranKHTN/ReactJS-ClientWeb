import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';

const BUTTON2 = () => {
  return (
    <Button variant="contained" color="primary">
        Primary
    </Button>
  );
}

BUTTON2.propTypes = {
    className: PropTypes.string,
    btnType: PropTypes.oneOf([
        "Cancel", "Submit", "Delete"
    ]).isRequired,
    children: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

BUTTON2.defaultProps = {
    className: "",
    children: "",
};

export default BUTTON2;
