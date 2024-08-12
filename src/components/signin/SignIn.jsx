import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required')
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
    <div>
      <h2>SignIn</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;



