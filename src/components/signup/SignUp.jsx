import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignUp.css';  

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',  
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be 50 characters or less')
      .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
      .required('Required'),  
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = values => {
    const { name, email, password } = values;
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');
    navigate('/home');
  };

  return (
    <div className="sign-up-container">
      <h2>Signup</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label>Name</label><br /><br />
              <Field
                type="text"
                name="name"
                className={`form-field ${touched.name && !errors.name ? 'valid' : ''} ${touched.name && errors.name ? 'invalid' : ''}`}
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
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
            <div className="form-group">
              <label>Confirm Password</label><br /><br />
              <Field
                type="password"
                name="confirmPassword"
                className={`form-field ${touched.confirmPassword && !errors.confirmPassword ? 'valid' : ''} ${touched.confirmPassword && errors.confirmPassword ? 'invalid' : ''}`}
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            <button type="submit" className="signup-button">Signup</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
