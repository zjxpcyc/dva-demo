import _ from 'lodash';
import request from './request';

const service = () => {
  const methods = {};
  let jwtToken = '';

  // 构造路由表
  const init = (params) => {
    const { jwtToken: token } = params;
    jwtToken = token;
  };

  // 构造查询语句
  const genQuery = (query) => {
    let q;
    if (typeof query === 'string') {
      q = query;
    } else if (_.isObject(query)) {
      q = _.toPairs(query).reduce((acc, val) => {
        const p = `${val[0]}=${val[1]}`;
        return acc ? `${acc}&${p}` : p;
      }, undefined);
    }

    if (q && q.indexOf('=') !== -1) {
      // 如果 query 是 abc=1 就在最前面加 ?
      q = `?${q}`;
    } else if (q && q.indexOf('/') === -1) {
     // 如果 query 是 url-subpath  就在最前面加 /
      q = `/${q}`;
    }

    return q;
  };

  // 构造form
  const genBody = (data) => {
    let d;
    if (data) {
      d = new window.FormData();
      Object.keys(data).forEach((key) => {
        const val = data[key] === undefined || data[key] === null ? '' : data[key];

        // 如果是文件
        if ((typeof val === 'object') && val.length && (val[0] instanceof window.File)) {
          for (let i = 0; i < val.length; i += 1) {
            d.append(key, val[i]);
          }
        } else {
          d.append(key, val);
        }
      });
    }
    return d;
  };

  // fetch 远程数据
  // dva 要求返回 Promise
  const fetch = async (from, params, meth) => {
    // 如果 params 含有 query 属性, 那么就组成 QueryString
    const q = params && params.query ? genQuery(params.query) : undefined;

    // 如果 params 含有 data 属性, 那么就构造 FormData
    // 否则就用其本身构造
    const b = !params ? undefined :
      (params.data ? genBody(params.data) :
        (!Object.hasOwnProperty.call(params, 'query') ? genBody(params) : undefined));

    let m = meth ? meth.toUpperCase() : undefined;
    let url;

    if (methods[from]) {
      // 如果是系统路由
      url = q ? `${methods[from].url}${q}` : methods[from].url;
      m = m || methods[from].meth.toUpperCase();
    } else {
     // 否则认为 from 为远程URL
      url = q ? from + q : from;
      m = m || 'GET';
    }

    const opt = !jwtToken ? ({ method: m, body: b }) :
    {
      method: m,
      body: b,
      headers: {
        Authorization: `${jwtToken}`,
      },
    };

    return request(url, opt);
  };

  // get 查询数据
  const get = (from, query) => fetch(from, { query }, 'GET');

  // post 创建或者更新远程数据
  const post = (from, params) => fetch(from, params, 'POST');

  // put 更新远程数据
  const put = (from, params) => fetch(from, params, 'PUT');

  // delete 删除远程数据
  const del = (from, params) => fetch(from, params, 'DELETE');

  return {
    init,
    get,
    post,
    put,
    del,
    fetch,
  };
};

export default service();
