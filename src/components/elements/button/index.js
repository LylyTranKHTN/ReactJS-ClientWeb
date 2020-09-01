import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import './styles.scss';

const HDTButton = ({ className, btnType, children, ...rest }) => {
    const color = btnType === 'Submit' ? 'primary'
        : (btnType === 'Delete' ? 'secondary' : 'default');
  return (
    <div className={`hdt-button ${className}`}>
      <Button variant="contained" color={color} {...rest} >
        {children ? children : btnType}
      </Button>
    </div>
  );
}

HDTButton.propTypes = {
    className: PropTypes.string,
    btnType: PropTypes.oneOf([
        "Cancel", "Submit", "Delete"
    ]).isRequired,
    children: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

HDTButton.defaultProps = {
    className: "",
    children: "",
};

export default HDTButton;
