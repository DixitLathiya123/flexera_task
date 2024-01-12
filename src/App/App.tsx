import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./App.css";
import GitHubReposIndex from "../components/GitHubRepos/GitHubReposIndex";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<GitHubReposIndex />} />
      </Routes>
    </div>
  );
};

export default App;
