const BASE_URL = "https://pixabay.com/api";
const API_KEY = "23984198-d5ba81eacae48fb09d6c38179";

const fetchImage = (query, page) => {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`There is no photos with ${query} name`));
  });
};

const api = { fetchImage };
export default api;
