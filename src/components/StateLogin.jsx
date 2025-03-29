import { useState } from 'react';
import Input from './Input.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';

export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password &&
    !hasMinLength(enteredValues.password, 6);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User Email: ' + enteredValues.email);
    console.log('User Password: ' + enteredValues.password);
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false,
    }))
  };

  const handleInputBlur = (identifier) => {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email'}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          value={enteredValues.password}
          error={passwordIsInvalid && 'Please enter a password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
