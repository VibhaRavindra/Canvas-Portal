import React from 'react';
import Profile from './Profile';
import renderer from 'react-test-renderer';
import { mount, shallow, render } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('Profile renders correctly', () => {
    const tree = shallow(<Profile match={{params:{profileid:10}}}/>);
    tree.setState({isLoggedIn:true})
    expect(tree).toMatchSnapshot();
  });

//   it('Sign in renders correctly', () => {
//     const wrapper = mount(<SignIn/>);
//     wrapper.find('#signupbutton').simulate('click');
//     expect(wrapper).toMatchSnapshot();
//   });