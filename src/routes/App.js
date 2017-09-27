import React from 'react';
import { Link } from 'dva/router';
import DefaultLayout from 'components/layout';

const App = (props) => {
  const handleLogOff = () => {

  };

  return (
    <DefaultLayout
      header={<h2>xx预算管理系统</h2>}
      sider={{ brand: (<h2 style={{ color: '#fff', padding: '32px 16px', textAlign: 'center' }}>Budget 1.0</h2>) }}
      footer={`Copyright YL @ ${new Date().getFullYear()}`}
      menu={{ data: props.menus, link: Link, mode: 'inline', theme: 'dark' }}
      user={props.user}
      onLogOff={handleLogOff}
      contentStyle={{ backgroundColor: '#fff', margin: '16px', padding: '16px' }}
    >
      { props.children }
    </DefaultLayout>
  );
};

export default App;
