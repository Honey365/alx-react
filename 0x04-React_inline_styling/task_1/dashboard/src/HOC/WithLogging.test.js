import React from "react";
import { shallow } from "enzyme";
import WithLogging from "./WithLogging";


describe("WithLogging HOC tests", () => {
    it("should call console.log on mount and dismount (total number of calls = 2)", () => {
        const TestComponent = () => <p>Test Component</p>;
        const spy = jest.spyOn(console, 'log').mockImplementation();
        const WrappedTestComponent = WithLogging(TestComponent);
        const wrapper = shallow(<WrappedTestComponent />);
        expect(spy).toHaveBeenCalledTimes(1);
        wrapper.unmount();
        expect(spy).toHaveBeenCalledTimes(2);
        spy.mockRestore();
    });

    it("should log out the right message on mount and on unmount (total number of calls = 2)", () => {
        const TestComponent = () => <p>Test Component</p>;
        const spy = jest.spyOn(console, 'log').mockImplementation();
        const WrappedTestComponent = WithLogging(TestComponent);
        const wrapper = shallow(<WrappedTestComponent />);
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith("Component TestComponent is mounted");
        wrapper.unmount();
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toBeCalledWith("Component TestComponent is going to unmount");
        spy.mockRestore();
    });
});
