import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Skeleton from "../skeleton/Skeleton";
import Error from "../error/Error";
import Spiner from "../spiner/Spiner";
import useMarvelService from "../../services/MarvelService";
import "./charInfo.scss";

const CharInfo = ({ idSelectedPerson }) => {
  const [person, setPerson] = useState(null);

  const { loading, error, clearError, getCharacterId } = useMarvelService();

  useEffect(
    () => {
      showPerson();
    },
    [idSelectedPerson]
  );
  const showPerson = () => {
    if (!idSelectedPerson) {
      return;
    }
    clearError();
    getCharacterId(idSelectedPerson).then(updateState);
  };

  const updateState = (person) => {
    setPerson(person);
  };

  const bags = error ? <Error /> : null;
  const spinner = loading ? <Spiner /> : null;
  const skeleton = error || loading || person ? null : <Skeleton />;
  const vue = !(error || loading || !person) ? <Vue person={person} /> : null;
  return (
    <div className='char__info'>
      {bags}
      {spinner}
      {skeleton}
      {vue}
    </div>
  );
};

const Vue = ({ person }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = person;
  let imageStyle = { objectFit: "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imageStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imageStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>

      <ul className='char__comics-list'>
        {comics.length > 0 ? null : "Sorry, but comics undefined"}
        {comics.map((comic, i) => {
          // eslint-disable-next-line
          if (i > 9) return;

          return (
            <li key={i} className='char__comics-item'>
              {comic.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
CharInfo.propTypes = {
  idSelectedPerson: PropTypes.number
};
export default CharInfo;
