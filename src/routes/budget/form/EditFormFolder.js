import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import FormFolder from 'components/budget/form/FormFolder';

const EditFormFolder = (props) => {
  return (
    <div>
      <Helmet>
        <title>表单目录维护</title>
      </Helmet>
      <div>
        <h2 style={{ padding: '32px' }}>表单目录维护</h2>
        <FormFolder
          data={{}}
          parent={{ value: '1', title: '父级' }}
          type={{ value: '1', title: '类型' }}
        />
      </div>
    </div>
  );
};

export default connect(s => s.form)(EditFormFolder);
