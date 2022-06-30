import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "../error/Error";
import Spiner from "../spiner/Spiner";
import useMarvelService from "../../services/MarvelService";
import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [chardEnd, setChardEnd] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    addAllComics(offset, true);
  }, []);

  const addAllComics = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(updateState);
  };

  const updateState = (newComics) => {
    let ended = false;
    if (newComics < 8) {
      ended = true;
    }
    setComics((comics) => [...comics, ...newComics]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setChardEnd((chardEnd) => ended);
  };
  const bags = error ? <Error /> : null;
  const spinner = loading && !setNewItemLoading ? <Spiner /> : null;
  return (
    <div className='comics__list'>
      {bags}
      {spinner}
      <ul className='comics__grid'>
        {comics.map((el, i) => {
          return (
            <li className='comics__item' key={i}>
              <Link to={`/comics/${el.id}`}>
                <img src={el.thumbnail} alt={el.name} style={{ objectFit: "unset" }} className='comics__item-img' />
                <div className='comics__item-name'>{el.title}</div>
                <div className='comics__item-price'>{el.price}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => addAllComics(offset)}
        disabled={newItemLoading}
        style={{ display: chardEnd ? "none" : "block" }}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
