import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { Modal } from 'antd';
import './index.css';

// 1. Initialize
const app = dva({
  // history: createHistory(),
  onError: (err) => {
    Modal.error({
      title: '错误',
      content: err.message,
    });
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
