import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Spiner from "../spiner/Spiner";
import AppHeader from "../appHeader/AppHeader";

const Main = lazy(() => import("../../pages/Main"));
const Comics = lazy(() => import("../../pages/Comics"));
const Page404 = lazy(() => import("../../pages/404"));
const SingleComicPage = lazy(() => import("../../pages/SingleComicPage"));

const App = () => {
  return (
    <Suspense fallback={Spiner}>
      <BrowserRouter>
        <div className='app'>
          <AppHeader />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/comics' element={<Comics />} />
            <Route path='/comics/:comicId' element={<SingleComicPage />} />

            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
