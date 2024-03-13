import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <div className="d-flex justify-content-between align-items-center flex-column flex-md-row p-3 border-bottom text-white bg-secondary">
        <h4 className="mr-md-auto">
          <a href="/" className="text-decoration-none text-white">
            BOOKS
          </a>
        </h4>
        <nav className="btn-group ">
          <Link className=" m-1  btn btn-light" to="/">
            Acceuil{" "}
          </Link>
          <Link className=" m-1 btn btn-light" to="/search">
            Search{" "}
          </Link>
        </nav>
      </div>
      {/**  Menu */}
    </header>
  );
};

export default Navbar;
