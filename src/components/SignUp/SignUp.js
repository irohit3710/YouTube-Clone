import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase/firebase.js";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    passConfirm:"",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const notification = (message,type) =>{
    if(type==="err"){
      toast.error(message)
    }
    else if(type==="warn"){
      toast.warn(message);
    }
  }

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || !values.passConfirm) {
      setErrorMsg("Fill all fields");
      notification("All Fields are required","warn");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    if(values.pass !== values.passConfirm){
      notification("Password not matched","err");
      setTimeout(setSubmitButtonDisabled(false),2000);
      return;
    }
    else{
      createUserWithEmailAndPassword(auth, values.email.trim(), values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/Login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        notification("All Fields are required","warn");
      });
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <InputControl
          label="PasswordConfirm"
          placeholder="Confirm password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, passConfirm: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Signup;