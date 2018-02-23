import React from 'react';
import {shallow} from 'enzyme';
import {Graph} from ".";


describe('Features/Graph', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Graph chartID={'test-chart'} chartOpts={{}}/>);
    });
    it('renders without exploding', () => {
        expect(component).toMatchSnapshot();
    });
    describe('analog gauge graph', () => {
        it('should render if called with analog gauge as prop type');
    });
    describe('line graph', () => {
        it('should render if called with line graph as prop type');
    });
});