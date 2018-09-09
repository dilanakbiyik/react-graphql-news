/**
 * home container tests
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home';

describe("Home container", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Home />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});