import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

const ImageGallery = forwardRef(({ images, refIndex }, ref) => {
  return (
    <GalleryList>
      {images.map((image, index) => {
        const { id, alt, smallImg, fullImg } = image;

        if (index === refIndex) {
          return (
            <ImageGalleryItem
              key={id}
              smallImg={smallImg}
              fullImg={fullImg}
              alt={alt}
              ref={ref}
            />
          );
        }

        return (
          <ImageGalleryItem
            key={id}
            smallImg={smallImg}
            fullImg={fullImg}
            alt={alt}
          />
        );
      })}
    </GalleryList>
  );
});

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      alt: PropTypes.string.isRequired,
      smallImg: PropTypes.string.isRequired,
      fullImg: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
