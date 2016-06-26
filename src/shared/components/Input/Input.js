import React, { Component } from 'react';
import { Border } from '../Border/Border';

class Input extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      value: this.props.value
    };
  }

  render() {
    return <FormControl></FormControl>
  }
}

export default Input;