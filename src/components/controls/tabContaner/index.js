import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function TabContainer({options}) {
    const { label } = options;

    return (
        <div className="tab-container">
            TabContainer
            <h1>{label}</h1>
        </div>
    );
}

TabContainer.propTypes = {
    options: PropTypes.shape({
        text: PropTypes.string,
        content: PropTypes.number,
    }),
}
  
TabContainer.defaultProps = {
    options: {

    }
};

export default TabContainer;
