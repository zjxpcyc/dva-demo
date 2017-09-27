import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Input, Col, Row, Button, Switch, Icon } from 'antd';
import routes from 'utils/routes';
import Table from 'components/common/XTable';

const Search = Input.Search;

class DimList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      search: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list,
    });
  }

  handleSearch = (val) => {
    this.setState({
      search: val,
      list: this.props.list.filter(x => x.Name.includes(val) || x.CnName.includes(val)),
    });
  }

  handleSearchChange = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        search: '',
        list: this.props.list,
      });
    }
  }

  render() {
    const { dimType } = this.props.dicts;

    const columns = [
      {
        title: '维度名称',
        dataIndex: 'Name',
        key: 'Name',
      },
      {
        title: '中文名称',
        dataIndex: 'CnName',
        key: 'CnName',
      },
      {
        title: '启用授权',
        dataIndex: 'Securtity',
        render: checked => (
          <Switch
            checked={checked === 1}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
          />
        ),
      },
      {
        title: '类型',
        dataIndex: 'Type',
        render: id => dimType && dimType.filter(x => x.Id === id)[0].Value,
      },
      {
        title: '操作',
        dataIndex: 'option',
        render: (t, r) => {
          const editUrl = routes.budget.dimension.edit.replace(':id', r.ID || r.Id);
          return (
            <Row type="flex">
              {/* {r.CanEdit && <Col><Link to="/">编辑</Link></Col>} */}
              {/* {r.CanEdit && <Col>|</Col>} */}
              <Col><Link to={editUrl}>编辑</Link></Col>
            </Row>
          );
        },
      },
    ];

    return (
      <div style={{ height: '100%' }}>
        <Helmet>
          <title>通知详情</title>
        </Helmet>
        <Row type="flex" style={{ margin: '16px 0' }}>
          <Col span={2} offset={1}>
            <Link to={routes.budget.dimension.add}><Button type="primary">增加维度</Button></Link>
          </Col>
          <Col span={2} offset={1}>
            <Link to={routes.budget.member.edit}><Button type="primary">维护成员</Button></Link>
          </Col>
          <Col span={18} style={{ paddingRight: '32px', textAlign: 'right' }}>
            <Search
              placeholder="请输入维度名称"
              style={{ width: 200 }}
              onSearch={this.handleSearch}
              onChange={this.handleSearchChange}
            />
          </Col>
        </Row>
        <div style={{ paddingTop: '16px' }}>
          <Table
            columns={columns}
            dataSource={this.state.list}
            rowKey={r => r.ID || r.Id}
          />
        </div>
      </div>
    );
  }
}

export default connect(s => s.dimension)(DimList);
