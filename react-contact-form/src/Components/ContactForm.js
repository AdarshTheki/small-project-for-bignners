import React, { useState } from "react";
import { v4 as uuIdv4 } from "uuid";
import axios from "axios";

const MyForm = () => {
  const [formData, setFormData] = useState({
    id: uuIdv4(),
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Send the form data to the server using Axios
    await axios.post("/api/contact", formData);

    // Check if the password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Clear the form fields after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        id='name'
        name='name'
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        id='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        required
      />

      <label htmlFor='confirmPassword'>Confirm Password:</label>
      <input
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <label htmlFor='message'>Message:</label>
      <textarea
        id='message'
        name='message'
        value={formData.message}
        onChange={handleChange}
        required></textarea>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default MyForm;
