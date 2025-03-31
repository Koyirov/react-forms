import Input from './Input.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import { useInput } from '../hooks/useInput.js';

const emailValidationFn = (value) => !isEmail(value) && isNotEmpty(value);
const passwordValidationFn = (value) => !hasMinLength(value, 6);

export default function StateLogin() {


  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError
  } = useInput('', emailValidationFn);
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: hasPasswordError
  } = useInput('', passwordValidationFn);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(hasEmailError || hasPasswordError) {
      return;
    }

    console.log('User Email: ' + emailValue);
    console.log('User Password: ' + passwordValue);
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          onBlur={() => handleEmailBlur()}
          onChange={(event) => handleEmailChange(event)}
          value={emailValue}
          error={hasEmailError && 'Please enter a valid email'}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          onBlur={() => handlePasswordBlur()}
          onChange={(event) =>
            handlePasswordChange(event)
          }
          value={passwordValue}
          error={hasPasswordError && 'Please enter a password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
