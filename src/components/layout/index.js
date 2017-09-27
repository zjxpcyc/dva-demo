import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import SiderBar from './SiderBar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import UserBrand from './User';

const { Content, Footer } = Layout;

class DefaultLayout extends React.Component {
  render() {
    const { name, avatar } = this.props.user;

    return (
      <Layout style={{ height: '100%' }}>
        <SiderBar {...this.props.sider} menuProps={this.props.menu} />
        <Layout>
          <Header
            user={(
              <UserBrand
                onLogOff={this.props.onLogOff}
                name={name}
                avatar={avatar}
              />
            )}
          >
            {this.props.header}
          </Header>
          {
            this.props.bread && <Breadcrumb data={this.props.bread} />
          }
          <Content style={this.props.contentStyle}>
            {this.props.children}
          </Content>
          <Footer>{this.props.footer}</Footer>
        </Layout>
      </Layout>
    );
  }
}

DefaultLayout.propTypes = {
  header: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ]), // eslint-disable-line
  footer: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ]), // eslint-disable-line
  sider: PropTypes.object.isRequired,
  bread: PropTypes.arrayOf(PropTypes.element), // eslint-disable-line
  contentStyle: PropTypes.object, // eslint-disable-line
  menu: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLogOff: PropTypes.func.isRequired,
};

export default DefaultLayout;
