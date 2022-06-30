import React from "react";
import { useState } from "react";

import decoration from "../resources/img/vision.png";
import CharInfo from "../components/charInfo/CharInfo";
import CharList from "../components/charList/CharList";
import RandomChar from "../components/randomChar/RandomChar";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
const Main = () => {
  const [id, setId] = useState(null);
  const addPersonId = (id) => {
    setId(id);
  };

  return (
    <main>
      <RandomChar />
      <div className='char__content'>
        <CharList addPersonId={addPersonId} />
        <ErrorBoundary>
          <CharInfo idSelectedPerson={id} />
        </ErrorBoundary>
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </main>
  );
};

export default Main;
