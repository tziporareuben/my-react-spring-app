import React, { useEffect, useState } from 'react';
import './MyDetails.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../myStore';
import { userudit } from '../../models/users';
import { Outlet, useNavigate } from "react-router";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { setMessage } from '../../redux/messageSlice'; // <-- ייבוא
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
  name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  phone: Yup.string().required("Phone is required").matches(/^0\d{8,9}$/, "Phone must start with 0 and be 9–10 digits"),
  password: Yup.string().required("Password is required").min(6, "At least 6 characters").matches(/[!@#$%^&*(),.?":{}|<>]/, "Must include special character"),
});

const MyDetails: React.FC = () => {
  const [initialUserData, setInitialUserData] = useState<userudit | null>(null);
  // const [showPassword, setShowPassword] = useState(false);
const dispatch = useDispatch();

  const userFromStore = useSelector((state: RootState) => state.auth.user);
 const navigate = useNavigate();
  useEffect(() => {
    if (!userFromStore?.id) return;

    axios.get(`http://localhost:8080/users/${userFromStore.id}`)
      .then(res => setInitialUserData(res.data))
      .catch(err => console.error('שגיאה בטעינת המשתמש:', err));
  }, [userFromStore?.id]);

  const defaultUser: userudit = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    // role: 2
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialUserData || defaultUser,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // שלח רק את הערכים הדרושים, עם id ו־role מקוריים
        const updatedUser: userudit = {
          ...values,
          id: initialUserData?.id ??0,
          // role: initialUserData?.role || 2
        };

        await axios.put(`http://localhost:8080/users/update/${updatedUser.id}`, updatedUser);
dispatch(setMessage({ text: " הפרטים עודכנו בהצלחה!", type: "success" }));
        setInitialUserData(updatedUser);
        navigate('/')
      } catch (err) {
        console.error('שגיאה בעדכון:', err);
      dispatch(setMessage({ text: "אירעה שגיאה", type: "error" })); // שגיאה
      }
    }
  });

  const handleCancel = () => {
    if (initialUserData) {
      formik.setValues({
        name: initialUserData.name,
        email: initialUserData.email,
        phone: initialUserData.phone,
        password: initialUserData.password,
        id: initialUserData.id,
        // role: initialUserData.role
      });
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h2>הפרטים שלי</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div className="error">{formik.errors.email}</div>}

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div className="error">{formik.errors.name}</div>}

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone && <div className="error">{formik.errors.phone}</div>}

          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              // type={showPassword ? "text" : "password"}
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
          {formik.errors.password && <div className="error">{formik.errors.password}</div>}

<div className="form-buttons">
  <Tooltip title="שמור">
    <IconButton type="submit" color="primary">
      <SaveIcon />
    </IconButton>
  </Tooltip>

  <Tooltip title="ביטול שינויים">
    <IconButton type="button" color="error" onClick={handleCancel}>
      <CancelIcon />
    </IconButton>
  </Tooltip>
</div>

        </form>
      </div>
    </div>
  );
};

export default MyDetails;
