import React from 'react';
import PropTypes from 'prop-types';
import loadsh from 'lodash';
import { Layout } from 'antd';
import Menu from './Menu';

const { Sider } = Layout;
// https://ant.design/components/layout-cn/#Layout.Sider
const siderAttributes = [
  'collapsible',
  'defaultCollapsed',
  'reverseArrow',
  'collapsed',
  'onCollapse',
  'trigger',
  'width',
  'collapsedWidth',
  'breakpoint',
  'style',
  'className',
];

class SiderBar extends React.Component {
  render() {
    const siderProps = loadsh.pick(this.props, siderAttributes);

    return (
      <Sider {...siderProps}>
        <div width="100%">
          {this.props.brand}
        </div>
        <Menu {...this.props.menuProps} />
      </Sider>
    );
  }
}

// https://ant.design/components/layout-cn/#breakpoint-width
SiderBar.__ANT_LAYOUT_SIDER = true; // eslint-disable-line

// 其余的 Sider 属性也都支持, 这里没有一一列举
SiderBar.propTypes = {
  brand: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  menuProps: PropTypes.object.isRequired,
};

export default SiderBar;
