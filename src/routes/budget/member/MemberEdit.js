import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import { Row, Col, Menu } from 'antd';
import SearchTree from 'components/common/SearchTree';
import MemForm from 'components/budget/dimension/MemForm';
import { normalize2AntTree, arr2AntdTree } from 'utils/antdHelper';
import { DIM_IDS, DIM_ROOT } from 'utils/bizconsts';

// const memTree = normalize2AntTree({
//   key: 'Key',
//   label: 'Title',
//   title: 'Title',
//   value: 'Key',
//   pKey: 'ParentKey',
//   children: 'Child',
// });

const memTree = arr2AntdTree({
  key: x => `${x.Id}`,
  label: 'CnName',
  title: 'CnName',
  value: x => `${x.Id}`,
  pKey: x => `${x.Parent}`,
});

class MemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: this.props.detail,
      formType: {},
      parent: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail) {
      this.setState({ detail: nextProps.detail });
    }
  }

  getApiPrefix = (formType) => {
    switch (formType.type) {
      case DIM_IDS.version:
        return 'version';
      case DIM_IDS.account:
        return 'account';
      case DIM_IDS.timePeriod:
        return 'period';
      case DIM_IDS.entity:
        return 'entity';
      case DIM_IDS.scenario:
        return 'scenario';
      case DIM_IDS.year:
        return 'year';
      default:
        break;
    }

    return '';
  }

  treeSearchFilter = (data, val) => {
    return data.CnName.includes(val);
  }

  handleContextMenuClick = (node, callback) => ({ key }) => {
    // 当前 node
    const { Id, Dim, CnName, Parent } = node;
    // 父 node
    const pnode = this.props.dicts.members.filter(x => `${x.Id}` === `${Parent}`)[0] || { Id: Parent, CnName: '根节点', isRoot: true };
    let parent = { id: pnode.Id, name: pnode.CnName };

    // 表单类型
    const formType = { type: Dim || Id, isMember: true };

    switch (key) {
      case 'addMember':
        break;
      case 'addSubMember':
        parent = { id: Id, name: CnName };
        break;
      default:
        break;
    }

    this.changeFormView(formType, 0, parent);
    callback();
  }

  // 使用 onSelect 来模拟 click 事件
  // 需要对 cancelSelect 进行特殊处理
  handleTreeClick = (keys) => {
    // 取消选择的事件不响应
    if (keys.length === 0) return undefined;

    // 当前 node
    const { Id, Dim, Parent } = this.props.dicts.members.filter(x => `${x.Id}` === `${keys[0]}`)[0];

    // 父 node
    const pnode = this.props.dicts.members.filter(x => `${x.Id}` === `${Parent}`)[0] || { Id: Parent, CnName: '根节点', isRoot: true };
    const parent = { id: pnode.Id, name: pnode.CnName };

    const formType = { type: Dim || Id, isMember: !!Dim };
    this.changeFormView(formType, Id, parent);
  }

  handleSubmit = (values, formType) => {
    const mth = values.Id ? 'update' : 'save';
    const apiPrefix = this.getApiPrefix(formType);
    this.props.dispatch({ type: `member/${mth}Member`, payload: { apiPrefix, data: values } });
  }

  // 依据类型渲染Form
  // id 为空或者0时, 代表新增
  changeFormView = (formType, id, parent) => {
    const nilDetail = !id || !formType.isMember ? { detail: { Parent: parent.id } } : {};

    const callback = !id || !formType.isMember ? undefined :
      () => {
        const apiPrefix = this.getApiPrefix(formType);
        this.props.dispatch({ type: 'member/getMember', payload: { apiPrefix, id } });
      };

    const state = { formType, parent, ...nilDetail };
    this.setState(state, callback);
  }

  genContextMenu = (node, callback) => {
    return (
      <Menu onClick={this.handleContextMenuClick(node, callback)}>
        {
          node.Dim && (<Menu.Item key="addMember">添加同级元素</Menu.Item>)
        }
        {
          node.Dim && (<Menu.Divider />)
        }
        <Menu.Item key="addSubMember">添加子级元素</Menu.Item>
      </Menu>
    );
  }

  render() {
    const memTreeData = memTree(this.props.dicts.members || []) || [];

    return (
      <div>
        <Helmet>
          <title>成员维护</title>
        </Helmet>
        <div>
          <Row gutter={16}>
            <Col span={6}>
              <SearchTree
                onSearchFilter={this.treeSearchFilter}
                data={memTreeData}
                contextMenu={this.genContextMenu}
                contextMenuCondition={x => x.Parent >= DIM_ROOT}
                onSelect={this.handleTreeClick}
              />
            </Col>
            <Col span={18}>
              <MemForm
                data={this.state.detail}
                dicts={this.props.dicts}
                parent={this.state.parent}
                formType={this.state.formType}
                onSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(s => s.member)(MemEdit);
