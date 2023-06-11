import React, { useState } from 'react';
import {v4 as uuIdv4} from 'uuid'
import {initializeApp} from 'firebase/app' 
import {getDatabase, ref, set} from 'firebase/database'
import axios from 'axios'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBPgdJTEH3PusqMHrP_HiYSmtsBmmHyisA",
  authDomain: "new-firebase-project-8faa3.firebaseapp.com",
  databaseURL: "https://new-firebase-project-8faa3-default-rtdb.firebaseio.com",
  projectId: "new-firebase-project-8faa3",
  storageBucket: "new-firebase-project-8faa3.appspot.com",
  messagingSenderId: "139859263521",
  appId: "1:139859263521:web:0a66a74946c4841da5e360",
  measurementId: "G-7SDQ5CTFW6"
};
const app = initializeApp(firebaseConfig);
// Basic write Operation
const writeUserData = (id, email, password, name, massage) => {
  const database = getDatabase(app);
  set(ref(database, 'users/' + id), {
    id, email, password, name, massage
  })
}


const MyForm = () => {
  const [formData, setFormData] = useState({
    id:uuIdv4(), name: '', email: '', password: '', confirmPassword: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send the form data to Firebase
      writeUserData(formData.id, formData.email, formData.password, formData.name, formData.message)
      console.log(formData);

      // Clear the form fields after successful submission
      setFormData({
        name:'',email:'',password:'',massage:'',confirmPassword:''
      });

      alert('Form submitted successfully!');
    } catch (error) {
      alert(console.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        autoComplete='off'
        
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete='off'
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete='off'
      />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete='off'
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        autoComplete='off'
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
