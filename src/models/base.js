import { Modal } from 'antd';

export default {
  namespace: 'base',

  state: {
    detail: {},
    list: [],
    pageNavi: [], // 每个元素为 { id: 'xx', current: 0, perpage: 10 }
  },

  effects: {
  },

  reducers: {
    syncState(state, { payload }) {
      return { ...state, ...payload };
    },

    syncPageNavi(state, { payload }) {
      const { pageNavi: oriSetting } = state;
      const pageNavi = oriSetting.filter(x => x.id !== payload.id).concat(payload);
      return { ...state, pageNavi };
    },

    appendList(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },

    alert(state, { payload }) {
      const { type, title, message, onOk } = payload || {};
      const tp = ['info', 'success', 'error', 'warning', 'confirm'].indexOf(type) > -1 ?
        type : 'error';
      Modal[tp]({ title: title || '错误', content: message, onOk });
      return { ...state };
    },
  },

};
