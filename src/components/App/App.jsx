import { useState, useEffect, useRef } from 'react';
import serverAPI from 'services/api';
import toast, { Toaster } from 'react-hot-toast';

import { TOAST_OPTION } from '../../services/toastOption';
import { Wrapper, Inner } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

const IMAGES_PER_PAGE = 12;

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);

  const toastId = useRef(null);
  const scrollByRef = useRef(null);

  useEffect(() => {
    if (filter === '') {
      return;
    }

    (async () => {
      setStatus(STATUS.PENDING);

      try {
        const data = await serverAPI.getData(filter, page, IMAGES_PER_PAGE);

        toast.dismiss(toastId.current);
        setImages(images => [...images, ...data.images]);
        setTotalImages(data.totalImages);
        setStatus(STATUS.RESOLVED);
      } catch (error) {
        setStatus(STATUS.REJECTED);
        toastId.current = toast.error(error.message);
      }
    })();
  }, [filter, page]);

  useEffect(() => {
    if (page > 1) {
      setTimeout(scrollPage, 0);
    }
  }, [page]);

  function handleFormSubmit(newFilter) {
    if (newFilter === filter) {
      return;
    }

    setFilter(newFilter);
    setImages([]);
    setTotalImages(0);
    setPage(1);
  }

  function handleLoadMore() {
    setPage(page => page + 1);
  }

  function haveMoreImages() {
    return totalImages - page * IMAGES_PER_PAGE > 0;
  }

  function scrollPage() {
    window.scrollBy({
      top: document.documentElement.clientHeight - scrollByRef.current.offsetTop,
      behavior: 'smooth',
    });
  }

  const isMoreImages = haveMoreImages() && status === STATUS.RESOLVED;

  return (
    <Wrapper>
      <Searchbar
        onSubmit={handleFormSubmit}
        isLoading={status === STATUS.PENDING}
      />

      <Inner>
        {images.length > 0 && (
          <ImageGallery
            images={images}
            ref={{ scrollByRef }}
          />
        )}

        {isMoreImages && <Button onClick={handleLoadMore} />}

        {status === STATUS.PENDING && (
          <Loader isFirstRender={images.length === 0} />
        )}
      </Inner>

      <Toaster {...TOAST_OPTION} />
    </Wrapper>
  );
}

export default App;
