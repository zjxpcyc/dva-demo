import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Tree, Input, Tooltip } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

// https://ant.design/components/tree-cn/#Tree-props
const treeAttributes = [
  'multiple',
  'checkable',
  'defaultExpandAll',
  'defaultExpandedKeys',
  'expandedKeys',
  'autoExpandParent',
  'defaultCheckedKeys',
  'checkedKeys',
  'checkStrictly',
  'defaultSelectedKeys',
  'selectedKeys',
  'onExpand',
  'onCheck',
  'onSelect',
  'filterTreeNode',
  'loadData',
  'onRightClick',
  'draggable',
  'onDragStart',
  'onDragEnter',
  'onDragOver',
  'onDragLeave',
  'onDragEnd',
  'onDrop',
  'showLine',
  'showIcon',
];

class SearchTree extends React.Component {
  constructor(props) {
    super(props);

    const nodeList = this.getNodeList(this.props.data);
    this.state = {
      expandedKeys: this.props.expandedKeys || [],
      searchValue: '',
      autoExpandParent: Object.hasOwnProperty.call(this.props, 'autoExpandParent') ?
        this.props.autoExpandParent : true,
      data: this.props.data,
      nodeList: nodeList || [],
      contextMenuShow: this.genContextMenuShow(nodeList),
      currentContextMenu: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const expandedKeys = nextProps.expandedKeys || this.state.expandedKeys;
    const autoExpandParent = Object.hasOwnProperty.call(this.props, 'autoExpandParent') ?
      this.props.autoExpandParent : this.state.autoExpandParent;
    const nodeList = this.getNodeList(nextProps.data);

    this.setState({
      data: nextProps.data,
      nodeList,
      expandedKeys,
      autoExpandParent,
      contextMenuShow: this.genContextMenuShow(nodeList),
      currentContextMenu: '',
    });
  }

  getNodeList = (tree) => {
    return (tree || []).reduce((acc, node) => {
      const newAcc = [...acc, lodash.omit(node, 'children')];

      return node.children && node.children.length ?
        [...newAcc, ...this.getNodeList(node.children)] :
        newAcc;
    }, []);
  }

  getParentNodes = (nodes) => {
    const { nodeList } = this.state;
    return (nodes || []).reduce((acc, node) => {
      const parents = nodeList.filter(x => x.key === node.pKey);

      return !parents.length ? acc :
        [...acc, ...parents, ...this.getParentNodes(parents)];
    }, []);
  };

  genContextMenuShow = (nodeList) => {
    return (nodeList || []).reduce((acc, node) => {
      return { ...acc, [node.key]: false };
    }, {});
  }

  handleSearch = (value) => {
    const { onSearchFilter } = this.props;
    const { nodeList } = this.state;

    // 如何执行 search 是父级定义的
    const searchedNodes = nodeList.filter(x => onSearchFilter(x.raw, value));
    const parents = this.getParentNodes(searchedNodes);
    const expandedKeys = lodash.uniq(parents.map(x => x.key));

    // 如果父级设置了展开的 keys 这里会覆盖父级设置
    // 取消搜索的时候会还原
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: false,
    });
  }

  handleSearchChange = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        expandedKeys: this.props.expandedKeys || [],
        autoExpandParent: this.props.autoExpandParent || false,
      });
    }

    this.setState({ searchValue: value });
  }

  handleTreeExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });

    if (this.props.onExpand) {
      this.props.onExpand(expandedKeys);
    }
  }

  handleTreeRightClick = ({ event, node }) => {
    const key = node.props.eventKey;

    if (this.props.contextMenu) {
      const oldContextMenu = this.state.currentContextMenu;
      const currentContextMenu = key;

      // 打开新的, 关闭之前打开的
      const contextMenuShow = {
        ...this.state.contextMenuShow,
        [currentContextMenu]: true,
        [oldContextMenu]: false,
      };

      this.setState({ contextMenuShow, currentContextMenu: key });
    }

    if (this.props.onRightClick) {
      this.props.onRightClick({ event, node: this.state.nodeList.filter(x => x.key === key)[0] });
    }
  }

  handleFrameClick = () => {
    this.hideContextMenu();
  }

  genContextMenu = (node) => {
    const callback = () => {
      const contextMenuShow = { ...this.state.contextMenuShow, [node.key]: false };
      this.setState({ contextMenuShow });
    };

    if (this.props.contextMenuCondition) {
      if (!this.props.contextMenuCondition(node.raw)) {
        return node.title || '---';
      }
    }

    return (
      <Tooltip
        visible={this.state.contextMenuShow[node.key]}
        overlayClassName="ant-tooltip-extend"
        placement="bottomLeft"
        title={this.props.contextMenu(node.raw, callback)}
      >
        {node.title || '---'}
      </Tooltip>
    );
  }

  hideContextMenu = () => {
    if (!this.state.currentContextMenu) return;

    const contextMenuShow = {
      ...this.state.contextMenuShow,
      [this.state.currentContextMenu]: false,
    };

    this.setState({ contextMenuShow });
  }

  render() {
    const treeProps = lodash.pick(this.props, treeAttributes);

    const { expandedKeys, autoExpandParent } = this.state;

    const renderNode = data => data.map((item) => {
      const nodeProps = {
        disabled: item.disabled || false,
        disableCheckbox: item.disableCheckbox || false,
        title: this.props.contextMenu ? this.genContextMenu(item) : (item.title || '---'),
        key: `${item.key}` || `${(new Date()).valueOf()}`,
        isLeaf: item.isLeaf || false,
      };

      return item.children && item.children.length ?
        <TreeNode {...nodeProps}>{renderNode(item.children)}</TreeNode> :
        <TreeNode {...nodeProps} />;
    });

    const withSearch = this.props.withSearch !== false;

    return (
      <div onClick={this.handleFrameClick}>
        {
          withSearch &&
          (
            <Search
              style={{ width: 'calc(100% -32px)', margin: '0 16px' }}
              placeholder="Search"
              onSearch={this.handleSearch}
              onChange={this.handleSearchChange}
            />
          )
        }
        <Tree
          onExpand={this.handleTreeExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          {...treeProps}
          onRightClick={this.handleTreeRightClick}
        >
          {renderNode(this.props.data)}
        </Tree>
      </div>
    );
  }
}

// 这里只列举了新增的属性
// Ant Tree 自身的属性仍然支持
// data 为节点值, 支持 官方定义的属性 https://ant.design/components/tree-cn/#TreeNode-props
// 但是增加了 children 与 raw 属性 , 其中 raw 为 当前 node 对应的原始数据
// contextMenu 是右键菜单
// contextMenuCondition 右键菜单的生成条件, 如果不设置, 所有节点都有右键菜单
SearchTree.propTypes = {
  data: PropTypes.array.isRequired,
  withSearch: PropTypes.bool, // eslint-disable-line
  onSearchFilter: PropTypes.func, // eslint-disable-line
  contextMenu: PropTypes.func, // eslint-disable-line
  contextMenuCondition: PropTypes.func, // eslint-disable-line
};

export default SearchTree;
