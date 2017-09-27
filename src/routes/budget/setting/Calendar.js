import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import CalForm from 'components/budget/setting/CalendarSetForm';

const CalSetting = (props) => {
  const handleSubmit = (values) => {

  };

  return (
    <div style={{ height: '100%' }}>
      <Helmet>
        <title>通用日历设置</title>
      </Helmet>
      <div style={{ width: '400px' }}>
        <CalForm dicts={props.dicts} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default connect(s => s.calendarset)(CalSetting);
