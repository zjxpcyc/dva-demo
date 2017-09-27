import modelExtend from 'dva-model-extend';
// import services from 'utils/services';
// import { RESPONSE_SUCCESS } from 'utils/consts';
// import { app } from 'utils/api';
import base from './base';

export default modelExtend(base, {
  namespace: 'app',

  state: {
    user: {
      id: 1,
      name: '张三',
      avatar: '',
    },
    menus: [],
    dict: {},
  },

  effects: {
    *appInit({ payload }, { call, put }) {  // eslint-disable-line
    },
  },
});
