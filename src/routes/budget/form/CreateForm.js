import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Steps, Button } from 'antd';
import FormBasic from 'components/budget/form/FormBasic';
import Dimension from 'components/budget/form/Dimension';
import FormPreview from 'components/budget/form/FormPreview';


const Step = Steps.Step;

const childrenNum = 3;
const genDict = (start, parent) => (it, inx) => {
  const id = start + inx;
  const titlePre = parent ? '维度' : '成员';
  const valuePre = parent ? 'dim' : 'mem';

  const item = {
    key: `${valuePre}-${id}`,
    label: `${titlePre}-${id}`,
    title: `${titlePre}-${id}`,
    value: `${valuePre}-${id}`,
  };

  if (parent) {
    item.children = lodash.times(childrenNum).map(genDict(1, false));
  }

  return item;
};

const dicts = {
  staticDim: lodash.times(3).map(genDict(1, true)),
  dynamicDim: lodash.times(3).map(genDict(4, true)),
  rowDim: lodash.times(3).map(genDict(7, true)),
  colDim: lodash.times(3).map(genDict(10, true)),
};

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      basic: {},
      basicData: {},
      layout: {},
      layoutErr: [],
    };
  }

  next = () => {
    const current = this.state.current;
    const updateStep = () => {
      this.setState({ current: current + 1 });
    };

    switch (current) {
      case 0:
        return this.canGoToStep2(updateStep);
      case 1:
        return this.canGoToStep3(updateStep);
      default:
        updateStep();
    }
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  canGoToStep2 = (callback) => {
    this.basic.validateFields((err, values) => {
      if (err) {
        return false;
      }

      this.setState({ basic: values }, callback);
    });
  }

  canGoToStep3 = (callback) => {
    const layout = this.state.layout;
    const errMsg = [];
    switch (true) { // eslint-disable-line
      case lodash.isEmpty(layout.static):
        errMsg.push('请设置固定维度');
      case lodash.isEmpty(layout.dynamic): // eslint-disable-line
        errMsg.push('请设置动态维度');
      case lodash.isEmpty(layout.row): // eslint-disable-line
        errMsg.push('请设置行维度');
      case lodash.isEmpty(layout.col): // eslint-disable-line
        errMsg.push('请设置列维度');
    }
    if (errMsg.length) {
      this.setState({ layoutErr: errMsg });
    } else {
      this.setState({ layoutErr: [] }, callback);
    }
  }

  handleDimensionChange = (val) => {
    this.setState({ layout: val });
  }

  handleFormBasicChange = (vals) => {
    const values = Object.keys(vals).reduce((acc, it) => {
      return {
        ...acc,
        [vals[it].name]: vals[it].value,
      };
    }, {});

    const basicData = {
      ...this.state.basicData,
      ...values,
    };

    this.setState({ basicData });
  }

  render() {
    const { current, basicData } = this.state;

    const formDicts = {
      ...this.props.dicts,
      ...dicts,
    };

    const content = [
      (
        <FormBasic
          data={basicData}
          ref={f => (this.basic = f)}
          dicts={formDicts}
          onChange={this.handleFormBasicChange}
        />
      ),
      (
        <div>
          <Dimension
            dicts={dicts}
            onChange={this.handleDimensionChange}
            value={this.state.layout}
          />
          {
            !!this.state.layoutErr.length &&
            (
              <ul
                style={{
                  color: 'red',
                  padding: '16px',
                  marginLeft: '16px',
                  borderLeft: '4px solid #ccc',
                }}
              >
                {
                  this.state.layoutErr.map((it, inx) => (
                    <li key={`layout-err-${inx}`} style={{ marginBottom: '8px' }}>
                      {`${inx + 1}: ${it}`}
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
      ),
      (
        <FormPreview dicts={dicts} data={this.state.layout} />
      ),
      (
        <div />
      ),
    ];

    return (
      <div>
        <div style={{ padding: '16px 32px' }}>
          <Steps current={current}>
            <Step title="基本信息" />
            <Step title="布局设计" />
            <Step title="其他选项" />
            <Step title="业务规则" />
          </Steps>
        </div>
        <div style={{ padding: '32px 16px', minHeight: '500px' }}>
          {content[current]}
        </div>
        <div style={{ textAlign: 'right', paddingRight: '64px' }}>
          {
            (current < content.length - 1) &&
            (<Button type="primary" onClick={this.next}>Next</Button>)
          }
          {
            (current === content.length - 1) &&
            (<Button type="primary" >Done</Button>)
          }
          {
            (current > 0) &&
            (
              <Button style={{ marginLeft: 8 }} onClick={this.prev}>
                Previous
              </Button>
            )
          }
        </div>
      </div>
    );
  }
}

export default connect(s => s.form)(CreateForm);
