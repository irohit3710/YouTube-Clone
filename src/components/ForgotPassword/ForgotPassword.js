import React, { useState } from 'react'
import InputControl from '../InputControl/InputControl'
import styles from './ForgotPassword.module.css'
import { database } from '../../firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'



const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const notification = (message, type) => {
        if (type === "success") {
            toast.success(`${message}`);
        }
        else if (type === "err" || type === "emptyFields") {
            toast.warning(`${message}`);
        }
    }

    const handleSubmit = () => {
        if (!values.email) {
            setErrorMsg("All Fields are required")
            notification("Fill all Fields", "emptyFields")
            return 0;
        }

        setSubmitButtonDisabled(true);
        sendPasswordResetEmail(database, values.email.trim()).then(() => {
            setSubmitButtonDisabled(false);
            notification("Password Reset Email Sent Succesfully", "success")
        }).catch(() => {
            setSubmitButtonDisabled(false);
            notification("Email not Registered", "err")
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Password Reset</h1>
                <InputControl
                    label="Email"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="Enter email address"
                />
                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button
                        onClick={handleSubmit}
                        disabled={submitButtonDisabled}
                    >
                        Send Email
                    </button>
                </div>
                <p>
                    Already have an account?{" "}
                    <span>
                    <Link to="/login">Login</Link>
                    </span>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword