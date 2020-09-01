import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Constants from 'constants';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const { ProductsList } = Constants.Paths;

const options = {
    [ProductsList]: [
        {
            name: 'title:breadCumbs.productList',
            href: ProductsList,
        }
    ]
};

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[100],
      height: theme.spacing(3),
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[300],
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[300], 0.12),
      },
    },
  }))(Chip);

const SimpleBreadcrumbs = ({ link, ...rest }) => {
    const { t } = useTranslation();

    if (!options[link] || options[link].length === 0) {
        return null;
    }
    return (
        <Breadcrumbs aria-label="breadcrumb" >
            <StyledBreadcrumb
                component="a"
                href="/"
                label="Home"
                icon={<HomeIcon fontSize="small" />}
            />
            {options[link].map(option =>
                <StyledBreadcrumb href={option.href} label={t(`${option.name}`)} {...rest} />
            )}
        </Breadcrumbs>
    );
}

SimpleBreadcrumbs.propTypes = {
    link: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        href: PropTypes.string,
    })).isRequired,
};

SimpleBreadcrumbs.defaultProps = {
};

export default SimpleBreadcrumbs;
