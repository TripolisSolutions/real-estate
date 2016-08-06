'use strict';

jest.unmock('../Button.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Button from '../Button.js';

describe('Button', () => {

  const button = TestUtils.renderIntoDocument(
    <Button>foo</Button>
  );

  const buttonNode = ReactDOM.findDOMNode(button);

  it('renders button', () => {
    expect(buttonNode).not.toBeNull();
  });

  it('should print correct text', () => {
    expect(buttonNode.textContent).toBe('foo');
  });
});
