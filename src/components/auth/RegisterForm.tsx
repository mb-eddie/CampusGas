import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface RegisterFormProps {
  switchToLogin: () => void;
}

interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const { register, isLoading, error } = useAuth();
  const { addNotification } = useNotifications();
  
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };
  
  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await register(values.name, values.email, values.phone, values.password);
      addNotification({
        userId: 'system',
        message: 'Welcome to Campus Gas! Your account has been created successfully.',
        type: 'success',
      });
    } catch (err) {
      // Error is already handled in the auth context
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">Full Name</label>
              <Field
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Full Name"
              />
              <ErrorMessage name="name" component="div" className="form-error" />
            </div>
            
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
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="Phone"
              />
              <ErrorMessage name="phone" component="div" className="form-error" />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="form-error" />
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
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </span>
              )}
            </button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="text-teal-600 hover:underline focus:outline-none"
                >
                  Login here
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;