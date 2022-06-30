import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "../components/error/Error";
import Spiner from "../components/spiner/Spiner";
import useMarvelService from "../services/MarvelService";
import AppBanner from '../components/appBanner/AppBanner.js'

import "./singleComic.scss";

const SingleComicPage = () => {
  let { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, clearError, getComicId } = useMarvelService();

  useEffect(
    () => {
      showComic();
    },
    [comicId]
  );
  const showComic = () => {
    clearError();
    getComicId(comicId).then(updateState);
  };

  const updateState = (comic) => {
    setComic(comic);
  };
  const bags = error ? <Error /> : null;
  const spinner = loading ? <Spiner /> : null;
  const vue = !(error || loading || !comic) ? <Vue comic={comic} /> : null;
  return (
    <>
    <AppBanner/>
      {bags}
      {spinner}
      {vue}
    </>
  );
};
const Vue = ({ comic }) => {
  const { title, description, thumbnail, price } = comic;
  return(

  <div className='single-comic'>
    <img src={thumbnail} alt={title} className='single-comic__img' />
    <div className='single-comic__info'>
      <h2 className='single-comic__name'>{title}</h2>
      <p className='single-comic__descr'>{description}</p>

      <div className='single-comic__price'>{price}</div>
    </div>
    <Link to='/comics' className='single-comic__back'>
      Back to all
    </Link>
  </div>
  )
};

export default SingleComicPage;
