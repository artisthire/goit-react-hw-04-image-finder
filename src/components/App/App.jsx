import { useState, useEffect, useMemo, useRef } from 'react';
import serverAPI from 'services/api';
import toast, { Toaster } from 'react-hot-toast';

import { TOAST_OPTION } from '../../services/toastOption';
import { Wrapper, Inner } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loading from 'components/Loading';

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

  useEffect(() => {
    if (filter === '') {
      return;
    }

    setStatus(STATUS.PENDING);

    serverAPI
      .getData(filter, page, IMAGES_PER_PAGE)
      .then(data => {
        toast.dismiss(toastId.current);
        setImages(images => [...images, ...data.images]);
        setTotalImages(data.totalImages);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        setStatus(STATUS.REJECTED);
        toastId.current = toast.error(error.message);
      });
  }, [filter, page]);

  function handleFormSubmit(filter) {
    setFilter(filter);
    setImages([]);
    setTotalImages(0);
    setPage(1);
  }

  function handleLoadMore() {
    setPage(page => page + 1);
  }

  function haveMoreImages() {
    const isMoreImages = totalImages - page * IMAGES_PER_PAGE > 0;

    return isMoreImages;
  }

  const showImages = useMemo(() => {
    const newImages = images.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        alt: tags,
        smallImg: webformatURL,
        fullImg: largeImageURL,
      })
    );

    return newImages;
  }, [images]);

  const isMoreImages = haveMoreImages() && status === STATUS.RESOLVED;

  return (
    <Wrapper>
      <Searchbar
        onSubmit={handleFormSubmit}
        isLoading={status === STATUS.PENDING}
      />

      <Inner>
        <ImageGallery images={showImages} />

        {isMoreImages && <Button onClick={handleLoadMore} />}

        {status === STATUS.PENDING && <Loading />}
      </Inner>

      <Toaster {...TOAST_OPTION} />
    </Wrapper>
  );
}

export default App;
