import React from 'react';
import FormatMoneyComponent from "../../Components/FormatMoneyComponent"
import {mount} from "../Enzyme"

let wrapper
beforeEach(()=>{
    wrapper = mount(<FormatMoneyComponent/>)
})

test('Match snapshot formatMoney component', () => {
    expect(wrapper).toMatchSnapshot()
});

test("Should correctly set the state value on change", () => {
    const value = 123;
    const instance = wrapper.instance()

    expect(wrapper.state('value')).toBe(undefined)
    jest.spyOn(instance, "handleChange")
    instance.handleChange({target: {value}})
    expect(instance.handleChange).toHaveBeenCalledWith({target: {value}})
    expect(wrapper.state('value')).toBe(value)
})

//TODO: tests for handleSubmit toHaveBeenCalled
//TODO: Snapshot test for error
