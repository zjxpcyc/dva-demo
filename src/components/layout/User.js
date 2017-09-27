import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Row, Col, Icon, Tooltip } from 'antd';

class UserBrand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  }

  handleLogOff = () => {
    this.setState(
      { show: !this.state.show },
      this.props.onLogOff,
    );
  }

  render() {
    const renderDetail = () => {
      return (
        <div style={{ padding: '16px' }}>
          <Row type="flex">
            <Col>
              <Icon type={this.props.avatar || 'user'} style={{ width: '64px', height: '64px', fontSize: '64px' }} />
            </Col>
            <Col>
              <div style={{ fontSize: '1.2em' }}>{this.props.name}</div>
            </Col>
          </Row>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={this.handleLogOff}>注销</Button>
          </div>
        </div>
      );
    };

    return (
      <div>
        <Tooltip
          visible={this.state.show}
          placement="bottomLeft"
          overlayClassName="ant-tooltip-extend"
          arrowPointAtCenter={false}
          title={renderDetail()}
        >
          <Row type="flex" style={{ alignItems: 'center' }} onClick={this.toggleShow}>
            <Col>
              <Avatar style={{ display: 'block' }} size="large" src={this.props.avatar} icon="user" />
            </Col>
            <Col>
              <div style={{ fontSize: '1.2em', marginLeft: '16px' }}>{this.props.name}</div>
            </Col>
          </Row>
        </Tooltip>
      </div>
    );
  }
}

UserBrand.propTypes = {
  onLogOff: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string, // eslint-disable-line
};

export default UserBrand;
