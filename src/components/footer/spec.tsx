import * as React from 'react';
import Footer from '.';
import * as renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
