import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface LoginFormProps {
  switchToRegister: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  const { login, isLoading, error } = useAuth();
  const { addNotification } = useNotifications();
  
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };
  
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      addNotification({
        userId: 'system',
        message: 'Welcome back! You have successfully logged in.',
        type: 'success',
      });
    } catch (err) {
      // Error is already handled in the auth context
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <Field
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></span>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </span>
              )}
            </button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={switchToRegister}
                  className="text-teal-600 hover:underline focus:outline-none"
                >
                  Register now
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;