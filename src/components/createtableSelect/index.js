import React from 'react';
import CreatableSelect from 'react-select/creatable';

const CreatableSingle = ({ options, ...rest }) => {
    return (
      <CreatableSelect
        {...rest}
      />
    );
}

export default CreatableSingle;
