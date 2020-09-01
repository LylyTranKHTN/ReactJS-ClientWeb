import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import './styles.scss';

const HDTCard = ({ className, btnType, children, ...rest }) => {
  return (
    <div className={`card ${className}`} {...rest}>
      <div className = {"btn-process rounded-circle"}>
        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
      </div>
      <a href={href} style={{zIndex: 1}}>
        <div className="hdt-card-img" style={{background: '#FFFFFF;'}}>
        </div>
          <div className="card-body">
          <span className="card-title">Danh mục khách hàng</span>
        </div>
      </a>
    </div>
  );
}

HDTCard.propTypes = {
    className: PropTypes.string,
    btnType: PropTypes.oneOf([
        "Cancel", "Submit", "Delete"
    ]).isRequired,
    children: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

HDTCard.defaultProps = {
    className: "",
    children: "",
};

export default HDTCard;
