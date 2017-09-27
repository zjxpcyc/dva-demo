import React from 'react';
import invariant from 'invariant';
import lodash from 'lodash';
import {
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
  Slider,
} from 'antd';
import Select from '../XSelect';

// Antd Form Item 支持的属性
// https://ant.design/components/form-cn/#Form.Item
const itemAttributes = [
  'label',
  'labelCol',
  'wrapperCol',
  'help',
  'extra',
  'required',
  'validateStatus',
  'hasFeedback',
  'colon',
];

// FormItem 生成 Antd Form.Item
//
// props = {
//   {...all-form-item-inner-attributes}
//   isPure: 'boolean 当前是纯组件则不需要 getFieldDecorator 包装',
//   element: 'String|function String 为 Antd 控件名称, function 为 React stateless function',
//   eleAttr: 'element 对应的 attribute',
//   name: 'name 字段',
//   options: 'options 里面内容会被送到 getFieldDecorator 中',
//   form: '主要用来调用 getFieldDecorator'
// }
const FormItem = (props) => {
  const defaultProps = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
    eleAttr: {},
    options: {},
  };

  const settings = Object.assign(defaultProps, props);

  const { isPure, name, options, element, eleAttr, form } = settings;

  if (!isPure) {
    invariant(settings.name, 'Form Item 必须有 name 字段');
  }

  // 如果设置 element 为空, 则意味着该字段为隐藏字段
  if (element === null) {
    form.getFieldDecorator(name, options);
    return null;
  }

  const itemProps = lodash.pick(settings, itemAttributes);

  const itemCtrl = () => {
    if (!element) return <Input {...eleAttr} />;
    if (typeof element !== 'string') return element(...eleAttr);

    switch (element) {
      case 'Cascader':
        return <Cascader {...eleAttr} />;
      case 'Checkbox':
        return <Checkbox {...eleAttr} />;
      case 'Checkbox.Group':
        return <Checkbox.Group {...eleAttr} />;
      case 'DatePicker':
        return <DatePicker {...eleAttr} />;
      case 'DatePicker.MonthPicker':
        return <DatePicker.MonthPicker {...eleAttr} />;
      case 'DatePicker.RangePicker':
        return <DatePicker.RangePicker {...eleAttr} />;
      case 'Input':
        return <Input {...eleAttr} />;
      case 'Input.TextArea':
        return <Input.TextArea {...eleAttr} />;
      case 'Input.Search':
        return <Input.Search {...eleAttr} />;
      case 'InputNumber':
        return <InputNumber {...eleAttr} />;
      case 'Radio':
        return <Radio {...eleAttr} />;
      case 'Radio.Group':
        return <Radio.Group {...eleAttr} />;
      case 'Select':
        return <Select {...eleAttr} />;
      case 'Slider':
        return <Slider {...eleAttr} />;
      case 'Switch':
        return <Switch {...eleAttr} />;
      default:
        return <Input {...eleAttr} />;
    }
  };

  return (
    <Form.Item {...itemProps}>
      {
        isPure ?
        element(...eleAttr) :
        form.getFieldDecorator(name, options)(itemCtrl())
      }
    </Form.Item>
  );
};

export default FormItem;
