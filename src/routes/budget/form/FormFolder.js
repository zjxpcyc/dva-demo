import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Button, Modal } from 'antd';
import Table from 'components/common/XTable';
import Tree from 'components/common/SearchTree';
import FormFolder from 'components/budget/form/FormFolder';

import { arr2AntdTree } from 'utils/antdHelper';
import { budget } from 'utils/routes';

const getTreeData = arr2AntdTree({
  key: x => `${x.ID}`,
  label: 'CnName',
  title: 'CnName',
  value: x => `${x.ID}`,
  pKey: x => `${x.Parent}`,
});

const tabCols = [
  {
    title: '序号',
    render: (t, r, i) => `${i + 1}`,
    key: 'SerialNo',
  },
  {
    title: '名称',
    dataIndex: 'CnName',
    key: 'CnName',
  },
  {
    title: '类型',
    render: (t, r) => (r.Type === 4 ? '表单' : '文件夹'),
    key: 'Type',
  },
  {
    title: '创建人',
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
  },
  {
    title: '创建时间',
    dataIndex: 'Created',
    key: 'Created',
  },
];

class FormFolderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
    };
  }

  showFormFolderEditor = () => {
    this.setState({ modalShow: true });
  }

  handleFormFolderSubmit = () => {
    this.ff.validateFields((err, values) => {
      if (err) {
        return false;
      }

      this.props.dispatch({
        type: 'form/saveFormFolder',
        payload: {
          data: values,
          onComplete: () => this.setState({ modalShow: false }),
        },
      });
    });
  }

  render() {
    const treeData = getTreeData(this.props.list) || [];
    const handleTreeSelect = (node) => {
      if (node.length < 1) return undefined;

      const id = node[0];
      this.props.dispatch({ type: 'form/getFormFolderChildren', payload: { id } });
    };

    return (
      <div>
        <Helmet>
          <title>表单目录</title>
        </Helmet>
        <div style={{ paddingTop: '32px' }}>
          <Modal
            title="表单目录维护"
            visible={this.state.modalShow}
            onOk={this.handleFormFolderSubmit}
          >
            <FormFolder
              ref={ff => (this.ff = ff)}
              data={this.props.detail}
              parent={this.props.dicts.formfolders || []}
              type={{ value: '1', title: '类型' }}
            />
          </Modal>
          <Row>
            <Col span={5} style={{ borderRight: '1px solid #e9e9e9' }}>
              <Tree
                data={treeData}
                withSearch={false}
                onSelect={handleTreeSelect}
              />
            </Col>
            <Col span={18} offset={1}>
              <Row style={{ paddingBottom: '16px' }}>
                <Col span={6}>
                  <Button type="primary" onClick={this.showFormFolderEditor}>增加文件夹</Button>
                </Col>
                <Col span={6}>
                  <Link to={budget.form.add}><Button type="primary">增加表单</Button></Link>
                </Col>
              </Row>
              <Table
                dataSource={this.props.children}
                columns={tabCols}
                rowKey={x => x.Id}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(s => s.form)(FormFolderList);
