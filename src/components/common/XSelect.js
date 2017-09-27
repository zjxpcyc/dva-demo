import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Select } from 'antd';

const realString = (val) => {
  if (val === undefined) return '';
  if (val === null) return '';

  return `${val}`;
};

// https://ant.design/components/select-cn/#Select-props
const selAttributes = [
  'value',
  'defaultValue',
  'mode',
  'allowClear',
  'filterOption',
  'onSelect',
  'onDeselect',
  'onChange',
  'onSearch',
  'onBlur',
  'onFocus',
  'placeholder',
  'notFoundContent',
  'dropdownMatchSelectWidth',
  'optionFilterProp',
  'optionLabelProp',
  'size',
  'showSearch',
  'disabled',
  'defaultActiveFirstOption',
  'dropdownStyle',
  'dropdownClassName',
  'getPopupContainer',
  'labelInValue',
  'tokenSeparators',
  'style', // 内置
];

const { OptGroup, Option } = Select;

class XSelect extends React.Component {
  renderOptions = (opts) => {
    if (lodash.isEmpty(opts)) return undefined;

    return opts.map((opt) => {
      const { disabled, value, title } = this.props.map2Option ?
        this.props.map2Option(opt) : opt;

      return (
        <Option disabled={disabled || false} key={`${value}`}>
          {title}
        </Option>
      );
    });
  }

  renderOptGroup = (optGrps) => {
    if (lodash.isEmpty(optGrps)) return undefined;

    return optGrps.map(({ label, key, options }) => {
      return (
        <OptGroup key={`${key}`} label={label}>
          {this.renderOptions(options)}
        </OptGroup>
      );
    });
  }

  render() {
    const selProps = lodash.pick(this.props, selAttributes);
    const selChildren = [];
    const optGrps = this.renderOptGroup(this.props.optGroups);
    const opts = this.renderOptions(this.props.options);
    if (optGrps) selChildren.push(...optGrps);
    if (opts) selChildren.push(...opts);

    if (Object.hasOwnProperty.call(selProps, 'value')) {
      if (!Array.isArray(selProps.value)) {
        selProps.value = realString(selProps.value);
      }
    }

    if (Object.hasOwnProperty.call(selProps, 'defaultValue')) {
      if (!Array.isArray(selProps.defaultValue)) {
        selProps.defaultValue = realString(selProps.defaultValue);
      }
    }

    return (
      <Select {...selProps}>
        {selChildren}
      </Select>
    );
  }
}

// 这里只列举了新增的属性
// Ant Select 自身的属性仍然支持
// 2.9 版本之前的 3 个模式属性不支持
// optGroups 与 options 的元素分别对应 Select.OptGroup, Select.Option 的属性对象
// https://ant.design/components/select-cn/#Option-props
// https://ant.design/components/select-cn/#OptGroup-props
// map2Option 是新增的辅助方法, 用来将外部字典里面的每一个项目映射为标准的 Option 属性
XSelect.propTypes = {
  optGroups: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
  options: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
  map2Option: PropTypes.func,  // eslint-disable-line
};

export default XSelect;
