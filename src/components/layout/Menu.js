import React from 'react';
import PropTypes from 'prop-types';
import loadsh from 'lodash';
import { Menu } from 'antd';

// https://ant.design/components/menu-cn/#Menu
const menuAttributes = [
  'theme',
  'mode',
  'selectedKeys',
  'defaultSelectedKeys',
  'openKeys',
  'defaultOpenKeys',
  'style',
  'inlineIndent',
  'multiple',
  'inlineCollapsed',
  'selectable',
  'onOpenChange',
  'onSelect',
  'onDeselect',
  'onClick',
];

class Menus extends React.Component {
  render() {
    const menuProps = loadsh.pick(this.props, menuAttributes);
    const Link = this.props.link;

    const renderMenuItem = (it) => {
      return (
        <Menu.Item key={it.id} disabled={it.disabled || false}>
          <Link to={it.link}>{it.title}</Link>
        </Menu.Item>
      );
    };

    const renderSubMenu = (it) => {
      const { disabled, id, title, children } = it;
      return (
        <Menu.SubMenu
          key={id}
          disabled={disabled}
          title={title}
        >
          {
            (children || []).map((x) => {
              const isMenuItem = !x.children || !x.children.length;
              return isMenuItem ? renderMenuItem(x) : renderSubMenu(x);
            })
          }
        </Menu.SubMenu>
      );
    };


    return (
      <Menu {...menuProps}>
        {
          (this.props.data || []).map((x) => {
            const isMenuItem = !x.children || !x.children.length;
            return isMenuItem ? renderMenuItem(x) : renderSubMenu(x);
          })
        }
      </Menu>
    );
  }
}


// data 为数组, 每个数组元素与 Menu 的 Item, SubMenu 其中一个一致
// 只是要把 key 属性换成 id
// 不支持 ItemGroup
// 其他 Menu 组件的属性都可以用
Menus.propTypes = {
  data: PropTypes.array.isRequired,
  link: PropTypes.func.isRequired, // eslint-disable-line
};

export default Menus;
