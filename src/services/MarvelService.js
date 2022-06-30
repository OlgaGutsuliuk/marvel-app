import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _baseUrl = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=9b8e0c7294a033a1209e4c806a5c2864";
  const _offset = 210;

  const getAllCharakters = async (offset = _offset) => {
    const res = await request(`${_baseUrl}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(getOnePerson);
  };

  const getCharacterId = async (id) => {
    const res = await request(`${_baseUrl}characters/${id}?${_apiKey}`);
    return getOnePerson(res.data.results[0]);
  };
  const getOnePerson = (info) => {
    return {
      id: info.id,
      name: info.name,
      description: info.description
        ? `${info.description.slice(0, 210)}...`
        : "Sorry, but there is no description of this hero",
      thumbnail: info.thumbnail.path + "." + info.thumbnail.extension,
      homepage: info.urls[0].url,
      wiki: info.urls[1].url,
      comics: info.comics.items
    };
  };
    const getAllComics = async (offset=0) => {
    const res = await request(`${_baseUrl}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
  return res.data.results.map(getComic)
    };
    const getComicId = async (id) => {
    const res = await request(`${_baseUrl}comics/${id}?${_apiKey}`);
    return getComic(res.data.results[0]);
    };
  
  
  const getComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is no description',
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      price: comic.prices.price ? `${comic.prices.price}$` : 'not available'
    };
  };

  return { loading, error, clearError, getCharacterId, getAllCharakters, getAllComics,getComicId };
};
export default useMarvelService;
