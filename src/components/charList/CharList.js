import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Error from "../error/Error";
import Spiner from "../spiner/Spiner";
import useMarvelService from "../../services/MarvelService";
import "./charList.scss";

const CharList = ({ addPersonId }) => {
  const [cardPerson, setCardPerson] = useState([]);

  const [newItemLoading, setNewItemLoading] = useState(false);

  const [offset, setOffset] = useState(210);
  const [chardEnd, setChardEnd] = useState(false);

  const { loading, error, getAllCharakters } = useMarvelService();

  useEffect(() => {
    addAllPerson(offset, true);
  }, []);

  const addAllPerson = (offset, initial) => {
    initial? setNewItemLoading(false): setNewItemLoading(true)
    getAllCharakters(offset).then(updateState);
  };

  const updateState = (newCardPerson) => {
    let ended = false;
    if (newCardPerson < 9) {
      ended = true;
    }
    setCardPerson((cardPerson) => [...cardPerson, ...newCardPerson]);

    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setChardEnd((chardEnd) => ended);
  };

  const bags = error ? <Error /> : null;
  const spinner = loading && !setNewItemLoading? <Spiner /> : null;
  return (
    <div className='char__list'>
      {bags}
      {spinner}
      <ul className='char__grid'>
        {cardPerson.map((el, index) => {
          return (
            <li className='char__item' key={index} onClick={() => addPersonId(el.id)}>
              <img src={el.thumbnail} alt={el.name} style={{ objectFit: "unset" }} />
              <div className='char__name'>{el.name}</div>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => addAllPerson(offset)}
        disabled={newItemLoading}
        style={{ display: chardEnd ? "none" : "block" }}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  addPersonId: PropTypes.func
};

export default CharList;
