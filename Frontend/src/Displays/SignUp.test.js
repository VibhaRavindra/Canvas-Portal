import React from 'react';
import SignUp from './SignUp';
import renderer from 'react-test-renderer';
import { mount, shallow, render } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('Signup renders correctly', () => {
    const tree = renderer
      .create(<SignUp/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });