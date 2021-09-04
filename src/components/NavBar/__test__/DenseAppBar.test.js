import React from 'react'
import ReactDOM from 'react-dom' // Since we need to render stuff
import DenseAppBar from './../DenseAppBar' // Render our component we are about to test

import {render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

afterEach(cleanup);

//Component Level Testing
it("renders without failing/crashing", ()=>{
    const div = document.createElement("div"); // Normal Javascript
    ReactDOM.render(<DenseAppBar />,div)
});

it("renders navbar correctly with correct input label",()=>{
    const {getByTestId} = render(<DenseAppBar label="My Crypto Portfolio"/>);
    expect(getByTestId('header')).toHaveTextContent("My Crypto Portfolio")
})

//Snapshot Testing
it("Matches snapshot 1",()=>{
    const tree = renderer.create(<DenseAppBar label="My Crypto Portfolio"/>).toJSON(); // Once dom is created we want to convert it to JSON like a virtual dom object
    expect(tree).toMatchSnapshot();
})


