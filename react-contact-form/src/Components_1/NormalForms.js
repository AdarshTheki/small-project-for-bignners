import React, { useState } from 'react'

const NormalForm = () => {
  const [status, setStatus] = useState('Submit')

  const handleSubmit = async(e) => {
    e.preventDefault();
    setStatus('SENDING...');
    const {name, email, massage} = e.target.elements;
    let Details = {
      name: name.value, email: email.value, massage: massage.value,
    };
    console.log(Details)

    let response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Details),
    });
    setStatus('SUBMIT');
    let result = await response.json();
    alert(result.status);
  };

  return (
    <form onSubmit={handleSubmit} method='POST'>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' required/>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' required/>
      </div>
      <div>
        <label htmlFor="massage">Massage:</label>
        <textarea id='massage' required/>
      </div>
      <button type='submit'>{status}</button>
    </form>
  )
}
export default NormalForm
