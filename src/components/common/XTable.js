import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import lodash from 'lodash';

// https://ant.design/components/table-cn/#Table
const tableAttributes = [
  'rowSelection',
  'pagination',
  'size',
  'dataSource',
  'columns',
  'rowKey',
  'rowClassName',
  'expandedRowRender',
  'defaultExpandedRowKeys',
  'expandedRowKeys',
  'defaultExpandAllRows',
  'onExpandedRowsChange',
  'onExpand',
  'onChange',
  'loading',
  'locale',
  'indentSize',
  'onRowClick',
  'onRowDoubleClick',
  'bordered',
  'showHeader',
  'footer',
  'title',
  'scroll',
];

class XTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 0,
      maxPage: 1,
    };
  }

  // 通过比较是否为当前行, 来返回当前行的 class
  handleActiveRow = (record, index) => {
    if (this.props.rowClassName) {
      return this.props.rowClassName(record, index);
    }
    return this.state.row === index ? 'ant-table-row-hover' : '';
  }

  // 将自带的 onChange 拆分为独立的 change 事件
  handleChange = (pagination, filters, sorter) => {
    // 拆分分页事件
    if (!lodash.isEmpty(pagination)) {
      // 如果指定分页事件, 就使用指定的
      if (this.props.onPagination) {
        this.props.onPagination(pagination);
      } else {
        // 否则使用内置的分页事件
        const pageUpdateNum = 5;
        if (pagination.current > 1 &&
          pagination.current % pageUpdateNum === 0 &&
          pagination.current > this.state.maxPage
          ) {
          // 默认分页实现的是, 如果点击到指定的页数，自动加载数据
          if (this.props.onAppendData) {
            this.props.onAppendData(pagination);
          }
        }
      }

      // 记录点击过的最大page
      if (pagination.current > this.state.maxPage) {
        this.setState({ maxPage: pagination.current });
      }
    }
    // 拆分过滤事件
    if (!lodash.isEmpty(filters) && this.props.onFilter) {
      this.props.onFilter(filters);
    }
    // 拆分排序事件
    if (!lodash.isEmpty(sorter) && this.props.onSort) {
      this.props.onSort(sorter);
    }
  }

  // 主要是为了获取当前的行号
  handleRowClick = (record, index) => {
    this.setState({ row: index });
    if (this.props.onRowClick) {
      this.props.onRowClick(record, index);
    }
  }

  render() {
    const tableProps = lodash.pick(this.props, tableAttributes);

    return (
      <Table
        rowClassName={this.handleActiveRow}
        {...tableProps}
        onRowClick={this.handleRowClick}
        onChange={this.handleChange}
      />
    );
  }
}

// 这里只列举了新增的属性
// Ant Table 自身的属性仍然支持
XTable.propTypes = {
  onPagination: PropTypes.func, // eslint-disable-line
  onAppendData: PropTypes.func, // eslint-disable-line
  onFilter: PropTypes.func, // eslint-disable-line
  onSort: PropTypes.func, // eslint-disable-line
};

export default XTable;
