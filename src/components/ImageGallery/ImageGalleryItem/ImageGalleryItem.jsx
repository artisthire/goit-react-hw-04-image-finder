import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { Item, Image, ImgModal } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ alt, smallImg, fullImg }) => {
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(showModal => !showModal);
  }

  return (
    <>
      <Item onClick={handleToggleModal}>
        <Image src={smallImg} alt={alt} />
      </Item>

      {showModal && (
        <Modal onClose={handleToggleModal}>
          <ImgModal src={fullImg} alt={alt} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
