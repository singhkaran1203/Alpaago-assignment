import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";


const Login = () => {

    const [error,setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {setUser} = useContext(AuthContext);

    const handleSubmit = (e)=>{
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user)
        navigate("/");
        // ...
      })
      .catch((err) => {
        setError(err)
      });
    }


  return (
    <div className="login">
      <form className="lContainer" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={(e)=>setEmail(e.target.value)}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e)=>setPassword(e.target.value)}
          className="lInput"
        />
        <button type="submit" className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  )
}

export default Login