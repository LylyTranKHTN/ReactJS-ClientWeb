import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import './styles.scss';

const ButtonLink = ({ children, component, to, ...rest}) => {
  return (
      <div className="hdt-link-button">
        <Link
            component={component || (to && RouterLink)}
			variant="body2"
			to={to}
            {...rest}
        >
            {children}
        </Link>
      </div>
  );
}

ButtonLink.propTypes = {
    children: PropTypes.string.isRequired,
    component: PropTypes.element,
    to: PropTypes.string,
};

ButtonLink.defaultProps = {
    component: undefined,
    to: null,
};

export default ButtonLink;
