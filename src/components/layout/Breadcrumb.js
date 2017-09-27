import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as Bread } from 'antd';

const genKey = inx => `bread-${inx}`;

// 只有基础功能, 没有与 react-router 等组件组合
// 所以不会支持 routes, params 等属性
class Breadcrumb extends React.Component {
  render() {
    return (
      <Bread>
        {
          (this.props.data || []).map((it, inx) => {
            return <Bread.Item key={genKey(inx)}>{it}</Bread.Item>;
          })
        }
      </Bread>
    );
  }
}

Breadcrumb.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Breadcrumb;
