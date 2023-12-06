// AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../component/Layout';
import MainPage from '../component/MainPage';
import ErrorPage from '../component/Error';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path="/listen"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
        <Route
          path="/vocabulary"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
        <Route
          path="/exam"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
        <Route
          path="/tutoring"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
        <Route path="*" element={<Layout><ErrorPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
