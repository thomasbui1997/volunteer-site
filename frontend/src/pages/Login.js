import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // Optional: For styling

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            login(response.data.token);
            setStatus({ success: 'Login successful!' });
            resetForm();
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setStatus({ error: 'Invalid username or password.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
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
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
