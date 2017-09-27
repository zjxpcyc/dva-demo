import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import DimForm from 'components/budget/dimension/DimForm';

const DimEdit = (props) => {
  const parent = { id: props.detail.Parent, name: '根节点' };
  const formType = { type: props.detail.Id, isMember: false };

  const handleSubmit = (values) => {
    if (!values.Id) {
      props.dispatch({ type: 'dimension/saveDimension', payload: values });
    } else {
      props.dispatch({ type: 'dimension/updateDimension', payload: values });
    }
  };

  return (
    <div>
      <Helmet>
        <title>维度维护</title>
      </Helmet>
      <div>
        <DimForm
          data={props.detail}
          dicts={props.dicts}
          parent={parent}
          formType={formType}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default connect(s => s.dimension)(DimEdit);
