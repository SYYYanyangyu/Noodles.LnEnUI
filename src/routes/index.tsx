// AppRouter.tsx

import React from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";


// custom component
import Layout from '../component/Layout';
import MainPage from '../component/MainPage';
import ErrorPage from '../component/Error';
import DataList from '../component/DataList';
import Category from '../views/category';

const AppRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout><MainPage /></Layout>}></Route>
      <Route path="/listen" element={<Layout><Category /></Layout>}></Route>
      <Route path="/vocabulary" element={<Layout><Category /></Layout>}></Route>
      <Route path="/exam" element={<Layout><Category /></Layout>}></Route>
      <Route path="/communication" element={<Layout><Category /></Layout>}></Route>
      <Route path="/listen" element={<Layout><Category /></Layout>}></Route>

      <Route path="/datalist" element={<Layout><DataList /></Layout>}></Route>
    </>
  )
);




export default AppRouter;
