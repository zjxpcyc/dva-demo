import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';

const { Header: Head } = Layout;

class Header extends React.Component {
  render() {
    return (
      <Head style={this.props.style || { background: '#fff' }}>
        <Row type="flex" justify="space-between">
          <Col>
            {this.props.children}
          </Col>
          <Col>
            {this.props.user}
          </Col>
        </Row>
      </Head>
    );
  }
}

// 默认有一个 User 的组件
Header.propTypes = {
  user: PropTypes.element, // eslint-disable-line
  style: PropTypes.object, // eslint-disable-line
};

export default Header;
