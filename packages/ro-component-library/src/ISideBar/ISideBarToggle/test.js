import React from 'react';
import { shallow } from 'enzyme';
import { TISideBarToggle } from '.';
import { Button } from '../../Button';

describe('ISideBarTobble', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      toggleSideBar: jest.fn(),
      Button,
    };
    component = shallow(<TISideBarToggle {...props} />);
  });
  it('Should render without exploding', () => {
    expect(component).toBeDefined();
  });
  it('Should contain a button', () => {
    expect(component.find('Button')).toHaveLength(1);
  });
  it('Should call toggleSideBar', () => {
    component.find('Button').props().onClick();
    expect(props.toggleSideBar).toHaveBeenCalledTimes(1);
  });
});