import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import App from './App';
import LogIn from './LogIn';

const LayOut = (props) => {
  return props.user.id ?
    <App {...props} /> :
    <LogIn {...props} />
    ;
};

export default withRouter(connect(s => s.app)(LayOut));
