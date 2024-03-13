import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooksByTitle } from "../redux/Slices/searchSlice";
import { ADD_BOOKS } from "../redux/Slices/bookSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const searchBooks = () => {
  const state = useSelector((state) => state.search);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const notify = () =>
    toast.success(" Livre enregistrées avec succes", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooksByTitle(title));
  };

  const displayFetchedBooks = state.loading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : state.error !== null ? (
    <p>{state.error}</p>
  ) : (
    state.fetchedBooks.map((data) => {
      return (
        <div className="card mb-2" key={data.id}>
          <div className="card-header">
            <h5 className="mb-0">
              <button
                onClick={() => setShow(!show)}
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target={`#${data.id}`}
                aria-expanded="false"
              >
                {data.volumeInfo.title}
              </button>
            </h5>
          </div>

          {show && (
            <div className="card-body">
              {data.volumeInfo.hasOwnProperty("imageLinks") && (
                <img
                  src={data.volumeInfo.imageLinks.thumbnail}
                  alt={data.volumeInfo.title}
                />
              )}

              <br />
              <h4 className="card-title">Titre: {data.volumeInfo.title}</h4>
              <h5 className="card-title">Auteurs: {data.volumeInfo.authors}</h5>
              <p className="card-text">
                Description: {data.volumeInfo.description}
              </p>
              <a
                href={data.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary"
              >
                {" "}
                Plus d'infos
              </a>
              <button
                onClick={() => {
                  dispatch(
                    ADD_BOOKS({
                      title: data.volumeInfo.title,
                      author: data.volumeInfo.authors,
                    })
                  );
                  notify();
                }}
                className="m-2 btn btn-outline-secondary"
              >
                Enregistrer
              </button>
              <ToastContainer />
            </div>
          )}
        </div>
      );
    })
  );
  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container mt-3 text-center">
          <h1 className="display-4">BOOKS</h1>
          <p>Indiquez le sujet du lirve a rechercher</p>
          <form
            onSubmit={handleSubmit}
            className="form-inline d-flex align-items-center  justify-content-center"
          >
            <div className="form-group m-3">
              <input
                value={title}
                type="text"
                name=""
                id=""
                className="form-control "
                placeholder="Rechercher"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary ">Rechercher</button>
            </div>
          </form>
          <div className="container" style={{ minHeight: "200px" }}>
            <div id="accordion">{displayFetchedBooks}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default searchBooks;
