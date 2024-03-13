import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_BOOKS,
  DELETE_BOOK,
  DELETE_ALL_BOOKS,
} from "../redux/Slices/bookSlice";
import FlipMove from "react-flip-move";
const AddBooks = () => {
  /* States and Hooks*/

  const initialState = {
    title: "",
    author: "",
  };
  const [newData, setNewData] = useState(initialState);
  const libraryData = useSelector((state) => state.library);
  const dispatch = useDispatch();

  /* Handlers */

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ADD_BOOKS(newData));
    setNewData(initialState);
  };
  const listBooks =
    libraryData.book.length > 0 ? (
      <FlipMove>
        {libraryData.book.map((book) => {
          return (
            <li
              key={book.id}
              className="list-group-item list-group-item-light d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>Livre :</strong> {book.title}
              </span>
              <span className="">
                <strong>Auteur : </strong>
                {book.author}
              </span>
              <span
                onClick={() => {
                  dispatch(DELETE_BOOK(book));
                }}
                className="btn btn-danger"
              >
                X
              </span>
            </li>
          );
        })}
      </FlipMove>
    ) : (
      <p className="text-center">No data</p>
    );
  const deleteButton =
    libraryData.book.length > 0 ? (
      <div className="d-flex justify-content-center">
        <button
          onClick={() => {
            dispatch(DELETE_ALL_BOOKS());
          }}
          className="btn btn-primary mt-4 mb-5"
        >
          Effacer lma liste{" "}
        </button>
      </div>
    ) : (
      ""
    );

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container mt-3 text-center">
          <h1 className="display-4">BOOKS</h1>
          <p>Ajouter un livre à votre bibliothèque </p>
          <form
            onSubmit={handleSubmit}
            className="form-inline d-flex align-items-center  justify-content-center"
          >
            <div className="form-group m-3">
              <input
                value={newData.title}
                type="text"
                name=""
                id=""
                className="form-control "
                placeholder="Titre"
                required
                onChange={(e) => {
                  setNewData({ ...newData, title: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <input
                value={newData.author}
                type="text"
                name=""
                className="form-control "
                placeholder="Auteur"
                required
                onChange={(e) => {
                  setNewData({ ...newData, author: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary m-3">
                Ajouter un livre
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container" style={{ minHeight: "200px" }}>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">{listBooks}</ul>
            {deleteButton}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddBooks;
