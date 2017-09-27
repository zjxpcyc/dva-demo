import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import PlanForm from 'components/budget/setting/PlanSetForm';

const PlanSetting = (props) => {
  const handleSubmit = (values) => {
    console.log(values)
  };

  return (
    <div style={{ height: '100%' }}>
      <Helmet>
        <title>规划类型设置</title>
      </Helmet>
      <div style={{ width: '660px', paddingLeft: '32px' }}>
        <PlanForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default connect(s => s.planset)(PlanSetting);
