import axios from 'axios';

const axiosGet = axios.create({
  method: 'get',
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '27905247-52ff39917099ed7913d47ea34',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

axiosGet.interceptors.response.use(({ data }) => {
  const images = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    alt: tags,
    smallImg: webformatURL,
    fullImg: largeImageURL,
  }));

  const newData = {
    total: data.total,
    totalImages: data.totalHits,
    images,
  };

  return newData;
});

async function getData(query, page = 1, perPage = 12) {
  try {
    const data = await axiosGet('', {
      params: {
        per_page: perPage,
        page,
        q: query,
      },
    });

    if (data.total === 0) {
      throw new Error(`Not found for request: "${query}"`);
    }

    return data;
  } catch (error) {
    if (error.code) {
      throw new Error(
        `Something went wrong. Please try again later.\nError: ${error.code}`
      );
    }

    throw error;
  }
}

const API = {
  getData,
};

export default API;
