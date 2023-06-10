import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPgdJTEH3PusqMHrP_HiYSmtsBmmHyisA",
  authDomain: "new-firebase-project-8faa3.firebaseapp.com",
  databaseURL: "https://new-firebase-project-8faa3-default-rtdb.firebaseio.com",
  projectId: "new-firebase-project-8faa3",
  storageBucket: "new-firebase-project-8faa3.appspot.com",
  messagingSenderId: "139859263521",
  appId: "1:139859263521:web:0a66a74946c4841da5e360",
  measurementId: "G-7SDQ5CTFW6",
};
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const Provider = new GoogleAuthProvider(app);

const SignInForms = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, password } = formData;
  
  const SignInForm = async (e) => {
    e.preventDefault();
    // Register with new user in firebase and sameName user not allowed.
    createUserWithEmailAndPassword(Auth, email, password)
      .then((data) => {
        console.log("Create", data);
        alert('Created This User Account')

        // Send and Verify email address in firebase
        sendEmailVerification(Auth.currentUser).then(() =>
          alert("Send Email Verification")
        );
        setFormData({ name: "", email: "", password: "" });
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };
    
  const LogInForm = e => {
    e.preventDefault()
    // Login email in firebase
    signInWithEmailAndPassword(Auth, email, password)
      .then((data) => {
        console.log(data);
        if(data.user.emailVerified === true){
          alert('Login Successfully')
        }
        else {
          alert('Your Email is not verified yet!')
        }
      })
      .catch((error) => {
        console.log(error.massage);
      });
  }

  const googleLogInHandler = e => {
    e.preventDefault();
    // Google signIn Popup show and signIn automatically
    signInWithPopup(Auth, Provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(result.user)
      alert(credential.signInMethod)
    }).catch((error) => {
      alert(error.massage);
    });
  }

  return (
    <>
      <form onSubmit={SignInForm} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label htmlFor='email'>
          Email:
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor='password'>
          Password:
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            autoComplete='off'
          />
        </label>
        <button type='submit'>Sign In</button>
      </form>
      
      <hr />

      <form onSubmit={LogInForm} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label htmlFor=''>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor=''>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            autoComplete='off'
          />
        </label>
        <button type='submit'>Log In</button>
      </form>
      <hr />

      <form onSubmit={googleLogInHandler} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label htmlFor=''>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor=''>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            autoComplete='off'
          />
        </label>
        <button type='submit'>With Google LogIn</button>
      </form>
    </>
  );
};

export default SignInForms;
