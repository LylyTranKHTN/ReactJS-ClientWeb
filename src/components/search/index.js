import React from 'react';
import './styles.scss';

const Search = (props) => {
    console.log(props);
    return (
        <div className="main-search mx-auto">
            <div className="container">
                <div className="row">
                    <div className="input-group col-xl-6 col-md-8 col-8 mx-auto">
                        <input className="txt-search form-control py-2 border-right-0 border" type="search" placeholder="Search" id="example-search-input"/>
                        <span className="input-group-append">
                            <button className="btn-search btn border-left-0 border" type="button">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Search.propTypes = {

};

Search.defaultProps = {

};

export default Search;
