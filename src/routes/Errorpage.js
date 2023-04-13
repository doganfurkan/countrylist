import "./Error.css";
import { Link } from "react-router-dom";

export default function Errorpage() {

  return (
    <>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an error has occured.</p>
        <Link to={"../"}>Main Page</Link>
      </div>
    </>
  );
}
