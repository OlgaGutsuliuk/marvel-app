import { useState, useEffect } from "react";

import Error from "../error/Error";
import Spiner from "../spiner/Spiner";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";

import "./randomChar.scss";

const RandomChar = () => {
  const [person, setPerson] = useState(null);

  const { loading, error, clearError, getCharacterId } = useMarvelService();
  useEffect(() => {
    updateData();
    const timerId = setInterval(updateData, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const updateState = (person) => {
    setPerson(person);
  };
  const updateData = () => {
    clearError()
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacterId(id).then(updateState);
  };

  const errorPerson = error ? <Error /> : null;
  const waiting = loading ? <Spiner /> : null;
  const vue = !(loading || error || !person) ? <VuePerson person={person} /> : null;
  return (
    <div className='randomchar'>
      {errorPerson}
      {waiting}
      {vue}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>

        <button onClick={updateData} className='button button__main'>
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

const VuePerson = ({ person }) => {
  const { name, description, thumbnail, homepage, wiki } = person;
  return (
    <div className='randomchar__block'>
      <img src={thumbnail} alt={name} className='randomchar__img' style={{ objectFit: "unset" }} />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{description}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
