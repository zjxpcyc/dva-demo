import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import Select from './XSelect';

class AssSelect extends React.Component {
  constructor(props) {
    super(props);

    const firstVal = this.props.first.value;
    this.state = {
      first: firstVal,
      next: this.props.next.value,
      nextOptions: firstVal ?
        (this.props.options.filter(x => x.value === firstVal)[0] || {}).children :
        [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const firstVal = nextProps.first.value;

    this.setState({
      first: nextProps.first.value,
      next: nextProps.next.value,
      nextOptions: firstVal ?
        (nextProps.options.filter(x => x.value === firstVal)[0] || {}).children :
        [],
    });
  }

  handleChange = () => {
    if (this.props.onChange) {
      const { first, next } = this.state;
      this.props.onChange([first, next]);
    }
  }

  handleFirstChange = (val) => {
    const choose = this.props.options.filter(x => x.value === val)[0] || {};
    const nextOptions = choose.children || [];

    this.setState({ first: val, next: [], nextOptions });
  }

  handleNextChange = (val) => {
    this.setState({ next: val }, this.handleChange);
  }

  render() {
    const nextOptions = this.state.nextOptions;

    const splitWidth = this.props.splitWidth || '16px';
    const [filterWidth, nextWidth] = this.props.warpSpan || [50, 50];
    const style = this.props.style ? { style: this.props.style } : {};
    const firstStyle = { width: `calc(${filterWidth}% - ${splitWidth})`, marginRight: splitWidth };
    const nextStyle = { width: `${nextWidth}%` };

    return (
      <div {...style}>
        <Select
          style={firstStyle}
          {...this.props.first || {}}
          value={this.state.first}
          mode=""
          options={this.props.options}
          onChange={this.handleFirstChange}
        />
        {
          this.props.useTree ?
          (
            <TreeSelect
              style={nextStyle}
              treeData={nextOptions}
              {...this.props.next || {}}
              value={this.state.next}
              onChange={this.handleNextChange}
            />
          ) :
          (
            <Select
              style={nextStyle}
              options={nextOptions}
              {...this.props.next || {}}
              value={this.state.next}
              onChange={this.handleNextChange}
            />
          )
        }
      </div>
    );
  }
}

AssSelect.propTypes = {
  options: PropTypes.array.isRequired,
  warpSpan: PropTypes.arrayOf(PropTypes.number),
  first: PropTypes.object,
  next: PropTypes.object,
  useTree: PropTypes.bool,
};

export default AssSelect;
