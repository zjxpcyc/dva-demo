import modelExtend from 'dva-model-extend';
import services from 'utils/services';
import { RESPONSE_SUCCESS } from 'utils/consts';
import { app } from 'utils/api';
import base from './base';

export default modelExtend(base, {
  namespace: 'app',

  state: {
    user: {
      id: 1,
      name: '张三',
      avatar: '',
    },
    menus: [
      {
        id: 0,
        title: '预算管理',
        children: [
          {
            id: 1,
            title: '创建表单',
            link: '/budget/form/add',
          },
          {
            id: 50,
            title: '维度列表',
            link: '/budget/dimension/list',
          },
          {
            id: 52,
            title: '成员管理',
            link: '/budget/member/edit',
          },
          {
            id: 90,
            title: '表单目录',
            children: [
              {
                id: 91,
                title: '目录列表',
                link: '/budget/formfolder',
              },
            ],
          },
          {
            id: 80,
            title: '应用设置',
            children: [
              {
                id: 81,
                title: '通用日历',
                link: '/budget/setting/calendar',
              },
              {
                id: 82,
                title: '规划类型',
                link: '/budget/setting/plan',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: '供应商',
        link: 'provider/list/',
      },
      {
        id: 3,
        title: '业务系统配置',
        link: 'systemset/list/',
      },
      {
        id: 4,
        title: '合同',
        link: 'contract/list/',
      },
    ],

    dict: {
      orgs: [
        {
          Id: '1',
          Name: '开发1组',
        },
        {
          Id: '2',
          Name: '开发2组',
        },
      ],
      subject: [
        {
          Id: '1',
          Name: '科目1',
        },
        {
          Id: '2',
          Name: '科目2',
        },
      ],
      calendar: [
        {
          Id: 1,
          Name: '一月',
        },
        {
          Id: 2,
          Name: '二月',
        },
        {
          Id: 3,
          Name: '三月',
        },
        {
          Id: 4,
          Name: '四月',
        },
        {
          Id: 5,
          Name: '五月',
        },
        {
          Id: 6,
          Name: '六月',
        },
      ],
    },
  },

  effects: {
    *appInit({ payload }, { call, put }) {  // eslint-disable-line
      const { code, args, effect } = payload || {};
      const params = code ? { code } : undefined;

      // 请求当前用户信息
      const dt = yield call(services[app.init.method], app.init.url, params);
      const res = dt.data;
      if (!res) {
        console.error(dt);
        throw new Error('系统初始化错误, 原因未知, 远程请求可能不正确');
      }

      if (res.code !== RESPONSE_SUCCESS) {
        throw new Error(res.message);
      }

      const { User: user, Types: postTypes, Token: jwtToken } = res.message;

      yield put({
        type: 'syncState',
        payload: { user, dict: { postTypes }, jwtToken },
      });

      yield effect(...args);

      window.sessionStorage.setItem('oauth2.code', code);
    },
  },
});
