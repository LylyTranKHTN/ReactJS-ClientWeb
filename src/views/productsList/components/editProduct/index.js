import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@material-ui/icons';
import * as productsActions from '../../actions';
import { AutoForm, Button } from 'components';
import './styles.scss';

const schema = {
    title: "Edit Product",
    type: "object",
    required: ["ma_sp", "ten_sp"],
    properties: {
        ma_sp: {type: "string", title: "Ma san pham"},
        ten_sp: {type: "string", title: "Tên sản phẩm"},
        phone: {type: "string", title: "Tên sản phẩm"}
    }
};

const uiSchema = {
    ma_sp: {
        "ui:placeholder": "Ma SP",
    },
    ten_sp: {
        "ui:placeholder": "Tên sản phẩm",
    },
    phone: {
        "ui:widget": "phone",
        "ui:options": {
            color: "blue",
            backgroundColor: "aqua",
        }
    },
};

const EditProduct = ({ onBack }) => {
    const { t } = useTranslation();

    const handleChange = ({formData}, e) => {
        console.log("form data", formData);
        console.log("e", e);
    };

    return (
        <div id="edit-product-page">
            <Button onClick={onBack}>
                <ArrowBack />
                {t('title:button.backToProductList')}
            </Button>
            <AutoForm
                schema={schema}
                uiSchema={uiSchema}
                onChange={handleChange}
            />
        </div>
    );
};

EditProduct.propTypes = {
    onBack: PropTypes.func.isRequired,
    product: PropTypes.shape({}),
    schema: PropTypes.shape({}),
    uiSchema: PropTypes.shape({})
};

EditProduct.defaultProps = {
    product: {},
    schema: {},
    uiSchema: {},
};

const mapStateToProps = state => ({
});
  
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...productsActions }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditProduct);
