import React, { useState } from 'react';
import validator from 'validator';

export default function Validation () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validation
    let formErrors = {};

    // Validate email
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
      formErrors.email = 'Invalid email format';
    }

    // Validate password strength
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      formErrors.password = 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one symbol.';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      alert('Form submitted successfully!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
