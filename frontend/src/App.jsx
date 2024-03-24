import React from "react";
import { Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import UpdateBook from "./pages/UpdateBook";
import GetBook from "./pages/GetBook";

const App = () => {
  return (
    <Route>
      <Router path="/" element={Home} />
      <Router path="/books/create" element={CreateBook} />
      <Router path="/books/get/:id" element={GetBook} />
      <Router path="/books/update/:id" element={UpdateBook} />
      <Router path="/books/delete/:id" element={DeleteBook} />
    </Route>
  );
};

export default App;
