import "./new.scss";
import Navbar from "../../components/navbar/Navbar";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const New = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", user.user.uid), {
        ...data,
        status: "acitve",
        timeStamp: serverTimestamp(),
      });
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <form className="iForm" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
          />
          <input
            className="input"
            type="emial"
            placeholder="email"
            id="email"
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
