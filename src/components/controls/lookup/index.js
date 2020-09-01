import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function LookupComponent({options}) {

    return (
        <div className="lookup-component">LookupComponent</div>
    );
}

LookupComponent.propTypes = {
    options: PropTypes.shape({
        
    }),
}
  
LookupComponent.defaultProps = {
    options: {},
};

export default LookupComponent;
