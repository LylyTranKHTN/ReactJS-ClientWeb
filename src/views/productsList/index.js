import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import * as productsActions from './actions';
import { DataTable, Link } from 'components';
import EditProduct from './components/editProduct';
import './styles.scss';

const getHeaders = (t, onClickEdit, headers = []) => ([
    ...headers.map(h => ({
        id: h.id,
        label: t(h.label),
    })),
    {
        id: 'action',
        customdatacell: {
            align: 'right'
        },
        formattedvalue: (id, row) => (<div>
            <Link onClick={() => onClickEdit(row)} >
                { t('title:button.edit') }
            </Link>
            <Link>
                { t('title:button.delete') }
            </Link>
        </div>)
    }
]);

const mockData = [
    {
        ma_sp: 1,
        ten_sp: "San Pham 1",
    },
    {
        ma_sp: 2,
        ten_sp: "San Pham 2",
    },
    {
        ma_sp: 3,
        ten_sp: "San Pham 3",
    },
    {
        ma_sp: 4,
        ten_sp: "San Pham 4",
    },
    {
        ma_sp: 5,
        ten_sp: "San Pham 5",
    },
    {
        ma_sp: 6,
        ten_sp: "San Pham 6",
    },
];

const ProductList = (props) => {
    const { actions, datatableSchema, editPageSchema, title } = props;

    const { t } = useTranslation();
    const [page, setPage] = React.useState(1);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [editedProduct, setEditProduct] = React.useState({});

    React.useEffect(() => {
        const timestamp = (new Date()).getTime();
        const params = new URLSearchParams(window.location.search.substring(1));
        if (_.isEmpty(datatableSchema) || _.isEmpty(editPageSchema)) {
            actions.getSchema(params.get("id"));
        } else {
            const tag = document.createElement('script');
            tag.async = false;
            tag.src = `/js/${params.get("id")}.js?timestamp=${timestamp}`;
            document.getElementsByClassName('container')[0].appendChild(tag);
        }
    }, [datatableSchema, editPageSchema]);

    const onClickEdit = (product) => {
        setIsEditMode(true);
        setEditProduct(product);
    };

    const onBackToProductList = () => {
        setIsEditMode(false);
        eval('onClick')(editedProduct);
    }

    const headers = getHeaders(t, onClickEdit, datatableSchema.headers);

    return (
        <div className="container">
            {!isEditMode ?
            <div id="hdt-product-list-page">
            <h5>{t('title:breadCumbs.productList')} {title}</h5>
            <DataTable
                headers={headers}
                data={mockData}
                page={page}
                onChangePage={(page) => setPage(page)}
                isPaging={datatableSchema.options && datatableSchema.options.isPaging}
                sizePerPage={datatableSchema.options && datatableSchema.options.sizePerPage}
            />
            </div> :
            <EditProduct
                onBack={onBackToProductList}
                product={editedProduct}
                schema={editPageSchema.schema}
                uischema={editPageSchema.uischema}
            />}
        </div>
    );
};

ProductList.propTypes = {
    actions: PropTypes.shape({
        getSchema: PropTypes.func.isRequired,
    }),
    datatableSchema: PropTypes.shape({}),
    editPageSchema: PropTypes.shape({}),
    title: PropTypes.string,
};

ProductList.defaultProps = {
    datatableSchema: {},
    editPageSchema: {},
    title: '',
};

const mapStateToProps = state => ({
    title: state.ProductsList.get('title'),
    datatableSchema: state.ProductsList.get('datatableSchema'),
    editPageSchema: state.ProductsList.get('editPageSchema'),
});
  
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...productsActions }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductList);
