import React from 'react';
import invariant from 'invariant';
import { Row, Col } from 'antd';
import FormItem from './FormItem';

// XForm 生成 Antd Form ( 包含 rc-form 以及 validation 配置 )
// https://ant.design/components/form-cn/#Form
// props = {
//   rowProps: 'Row 的 props, 主要用于多列显示',
//   items: '一维或者二维数组, 每个元素代表一个 FormItem',
//   form: 'Form.Create 之后的 form 对象'
// }

const FormBody = (props) => {
  invariant(props.items && props.items.length, '不支持创建空的表单');
  invariant(!!props.form, '请使用 Form.Create 方式创建表单');

  const { rowProps, form, items } = props;

  const renderItem = it => (<FormItem {...it} />);

  const renderCol = (it, colNo, self) => {
    const itProps = { ...it, form };
    const span = 24 / self.length;

    return (
      <Col key={`form-col-${colNo}`} span={span}>
        { renderItem(itProps) }
      </Col>
    );
  };

  const renderRow = (cols, rowNo) => {
    return Array.isArray(cols) ?
      (
        <Row key={`form-row-${rowNo}`} {...(rowProps || {})}>
          {
            (cols || []).map(renderCol)
          }
        </Row>
      ) :
      renderItem({ ...cols, form, key: `form-filed-${rowNo}` });
  };

  return (
    <div>
      {
        items.map(renderRow)
      }
    </div>
  );
};

export default FormBody;
