import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { signOut } from "firebase/auth";
import {auth} from "../../firebase";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = (e)=>{
    // e.preventDefault();
    signOut(auth).then(() => {
      // Sign-out successful.
      localStorage.setItem("user",null);
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <div className="navbar">
      <div className="container">
        <span className="logo">Alpaago</span>
        <div className="pages">
          <Link to="/" style={{"color":"inherit" ,"textDecoration":"none"}}>
            <span className="page">Home</span>
          </Link>
          <Link to="/users" style={{"color":"inherit" ,"textDecoration":"none"}}>
            <span className="page">Users</span>
          </Link>
          <button className="button" onClick={handleLogOut}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
