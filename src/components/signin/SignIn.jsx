import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignIn.css'
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
  });

  const onSubmit = values => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      
      if (user.email === values.email && user.password === values.password) {
        localStorage.setItem('loggedIn', 'true');
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } else {
  
      alert('No user found. Please sign up first.');
      navigate('/signup');
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label>Email</label><br /><br />
              <Field
                type="email"
                name="email"
                className={`form-field ${touched.email && !errors.email ? 'valid' : ''} ${touched.email && errors.email ? 'invalid' : ''}`}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label>Password</label><br /><br />
              <Field
                type="password"
                name="password"
                className={`form-field ${touched.password && !errors.password ? 'valid' : ''} ${touched.password && errors.password ? 'invalid' : ''}`}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="login-button">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;




