import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from './routes/Layout';
import routes from './routes';

const genRouteKey = k => `route-${k}`;

export default ({ app, history }) => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          {
            routes.map(({ path, ...dynamics }, inx) => (
              <Route
                key={genRouteKey(inx)}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
        </Switch>
      </Layout>
    </Router>
  );
};
