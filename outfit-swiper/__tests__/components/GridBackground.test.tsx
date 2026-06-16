import React from 'react';
import renderer from 'react-test-renderer';
import { GridBackground } from '../../components/GridBackground';

describe('GridBackground', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<GridBackground />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
