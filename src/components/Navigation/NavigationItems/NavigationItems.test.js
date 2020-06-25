import React from 'react'

import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({adapter : new Adapter()})

describe('<NavigationItems />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)

  })

  it('should render two <NavigationItems /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render tree <NavigationItems /> elements if authenticated', () => {
    wrapper.setProps({ isAuth: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should have Logout element if authenticated', () => {
    wrapper.setProps({ isAuth: true })
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
  })
})
