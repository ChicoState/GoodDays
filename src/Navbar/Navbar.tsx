import './Navbar.css';
import { Link } from "react-router-dom";

type NavbarProps = {
  //
};

const Navbar = (props: NavbarProps) => {
    return (
    <nav className={"navbar"}>
      <div className="navbar-brand">
        <h1>GoodDays</h1>
      </div>


      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Create">Create</Link></li>
        <li><Link to="/Reports">Reports</Link></li>
      </ul>
    </nav>);
}

export default Navbar;
