import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './particles/Container';
import { Pic } from './particles/Pic';

console.warn('Image will be removed soon!');
const Image = ({ ...props }) => (
  <Container>
    <Pic {...props} />
  </Container>
);

Image.propTypes = {
  imgStyle: PropTypes.string,
  imgSize: PropTypes.string,
};
Image.defaultProps = {
  imgStyle: 'default',
  imgSize: 'default',
};

export { Image };
