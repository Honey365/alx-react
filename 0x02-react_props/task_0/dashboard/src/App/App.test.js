import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe('App Component rendering tests', () => {
    it('renders <App /> without crashing', () => {
        shallow(<App />);
    });

    it('renders <div class="App-header">...', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App-header')).toHaveLength(1);
    });

    it('renders <div class="App-body">...', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App-body')).toHaveLength(1);
    });

    it('renders <div class="App-footer">...', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.App-footer')).toHaveLength(1);
    });
});
