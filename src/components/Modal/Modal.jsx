import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { Overlay, Container, CloseBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function handleKeyDown(evt) {
    if (evt.code === 'Escape') {
      onClose();
    }
  }

  function handleOverlayClick({ target, currentTarget }) {
    if (target === currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Container>
        {children}

        <CloseBtn type="button" onClick={onClose} aria-label="Close modal">
          <IoMdClose />
        </CloseBtn>
      </Container>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
