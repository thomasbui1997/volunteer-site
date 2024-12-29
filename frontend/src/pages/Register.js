import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            const { username, password } = values;
            await axios.post('http://localhost:8080/register', { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStatus({ success: 'Registration successful! Please log in.' });
            resetForm();
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setStatus({ error: 'Registration failed. Username might be taken.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        {status && status.success && <p className="success-message">{status.success}</p>}
                        {status && status.error && <p className="error-message">{status.error}</p>}
                        <div>
                            <label>Username:</label>
                            <Field type="text" name="username" />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <Field type="password" name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
