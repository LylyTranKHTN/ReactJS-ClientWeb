import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'components';

const Dashboard = (props) => {
    const { t } = useTranslation();
    console.log(props);
    return (
    <div>
        {t('title:dashboard.dashboard')}
        <Search />
    </div>
    );
};

Dashboard.propTypes = {

};

Dashboard.defaultProps = {

};

export default Dashboard;
