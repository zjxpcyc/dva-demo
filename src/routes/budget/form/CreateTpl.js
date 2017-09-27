import React from 'react';
import { Steps, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DimOfView from 'components/budget/form/DimOfView';
import Template from 'components/budget/form/Template';

const Step = Steps.Step;

class CreateTpl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      tplData: [],
      rowChecked: [],
      colChecked: [],
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     data: nextProps.data,
  //   });
  // }

  handleDimSelect = ({ rowChecked, colChecked }) => {
    this.setState({ rowChecked, colChecked });
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });

    // 最后一步
    const stepLast = 1;
    if (current === stepLast) {
      // 行来源
      const rowRaw = [];
      const iterateeTimes = this.state.rowChecked.length;
      const iterateeRow = (init, inx) => {
        if (inx >= iterateeTimes) return init;

        const dts = this.state.rowChecked[inx].checkedList;
        const rtn = [];
        dts.forEach((it) => {
          if (inx < iterateeTimes) {
            const res = iterateeRow([...init, it.label], inx + 1);
            rtn.push(...res);
          } else {
            rtn.push(...[...init, it.label]);
          }
        });

        return rtn;
      };

      rowRaw.push(...iterateeRow([], 0));

      // 列来源
      const colRaw = [];
      this.state.colChecked.forEach((x) => {
        const { checkedList } = x;
        colRaw.push(...(checkedList || []).map(it => it.label));
      });

      const leftColNum = this.state.rowChecked.length;
      const rightColNum = colRaw.length;

      // 先只针对一行 head 情况
      const headRow = [
        ...lodash.fill(Array(leftColNum), ''),
        ...colRaw,
      ];

      const otherRows = lodash.chunk(rowRaw, leftColNum).map((it) => {
        return [
          ...it,
          ...lodash.fill(Array(rightColNum), ''),
        ];
      });

      console.log(this.state.rowChecked);

      this.setState({ tplData: [headRow, ...otherRows] });
    }
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current, rowChecked, colChecked } = this.state;
    const { rowDimList, colDimList, dimDatas } = this.props;

    return (
      <div style={{ padding: '100px' }}>
        <div>
          <Steps current={current}>
            <Step title="设置视点维度" />
            <Step title="设置表单" />
          </Steps>
        </div>
        <div style={{ margin: '32px 8px', padding: '24px 8px', border: '1px solid #e9e9e9' }}>
          {
            current < 1 ?
            (
              <DimOfView
                rowDimList={rowDimList}
                colDimList={colDimList}
                rowChecked={rowChecked}
                colChecked={colChecked}
                dimDatas={dimDatas}
                onSelect={this.handleDimSelect}
              />
            ) :
            (<Template data={this.state.tplData} />)
          }
        </div>
        <div style={{ padding: '8px 30px' }}>
          <Row>
            <Col span={16}>
              {
                current > 0 ?
                (<Button onClick={this.prev}>上一步</Button>) :
                (<Button onClick={this.next}>下一步</Button>)
              }
            </Col>
            <Col span={8}>
              <Button type="primary">确定</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    rowDimList: [
      {
        dimension: 'orgs',
        label: '组织',
      },
      {
        dimension: 'subject',
        label: '科目',
      },
    ],
    colDimList: [
      {
        dimension: 'calendar',
        label: '月份',
      },
    ],
    dimDatas: state.app.dict,
  };
};

export default connect(mapStatesToProps)(CreateTpl);
