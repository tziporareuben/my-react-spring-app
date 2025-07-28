
import React, { useState } from 'react';
import './Login.scss';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/authslice';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationLogin = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationLogin,

//     onSubmit: async (values) => {
//  const response = await axios.get('http://localhost:3001/users');
// const users = response.data;


//  const user = users.find(
//   (u: any) =>
//     u.email.trim().toLowerCase() === values.email.trim().toLowerCase() &&
//     u.password === values.password
// );

// if (user) {
//   dispatch(setToken(String(user.id))); // אם את משתמשת ב-id כמין "טוקן"
//   dispatch(setUser(user)); // הוספת המשתמש עצמו ל־Redux
//     if (user.role === 1 || user.role === 0) {
//     navigate("/");
//   } else {
//     navigate("/");
//   }
// }

// }
onSubmit: async (values) => {
  try {
    const response = await axios.post('http://localhost:8080/users/login', {
      email: values.email,
      password: values.password,
    });
    const user = response.data;
    dispatch(setToken(String(user.id))); 
    dispatch(setUser(user)); 

    if (user.role === 1 || user.role === 0) {
      navigate("/");
    } else {
      navigate("/");
    }
  } catch (error) {
    setError("אימייל או סיסמה לא נכונים");
  }
}

  });

  return (
    <div className="login-page">
      <div className="login-container">
                      <img
                    className="logo"
                    src="https://ayeletginzburg.com/wp-content/uploads/2024/05/אייקון-פלאי-גדול-חלול-1024x1024.png"
                    alt="Logo"
                />
                <h2>Sign in to your account</h2>
              <p className="sub-text">
    Not a member?{' '}
    <Link to="/signup" className="link">
        Start a 14 day free trial
    </Link>
</p>
        <h2>Login</h2>
      
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div className="alert error">{formik.errors.email}</div>}

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {/* <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button> */}
          </div>
          {formik.errors.password && <div className="alert error">{formik.errors.password}</div>}
          {error && <div className="alert error">{error}</div>}

          <button type="submit" className="sign-in-button">Sign in</button>
        </form>


   
      </div>
    </div>
  );
};

export default Login;
