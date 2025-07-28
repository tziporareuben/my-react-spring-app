import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminchangeRole.scss';
import { Users } from '../../models/users';
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { RootState } from '../../myStore';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/messageSlice';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const AdminchangeRole: React.FC = () => {

const selectedUser = useSelector((state: RootState) => state.auth.selectedUser);
const userId = selectedUser?.id;
const dispatch = useDispatch();

  const navigate = useNavigate();

  const [users, setUsers] = useState<Users | null>(null);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/users/${userId}`)
      .then(res => setUsers(res.data))
      .catch(err => console.error('שגיאה בטעינת המשתמש:', err));
  }, [userId]);

const defaultuser: Users = {
  id: selectedUser?.id ??0,
  name: selectedUser?.name || '',
  email: selectedUser?.email || '',
  phone: selectedUser?.phone || '',
  password: selectedUser?.password || '',
  role: selectedUser?.role ?? 2,
};


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: users || defaultuser,
    onSubmit: async (values) => {
      try {
    const updateduser: Users = {
  ...values,
  id: selectedUser?.id ??0,
  name: selectedUser?.name || '',
  phone: selectedUser?.phone || '',
  email: selectedUser?.email || '',
  password: selectedUser?.password || '', 
};


await axios.put(`http://localhost:8080/users/admin-change-role/${selectedUser?.id}`, updateduser);
   dispatch(setMessage({ text: 'הפרטים! עודכנו בהצלחה', type: 'success' }));

        setUsers(updateduser);
        navigate('/');
      } catch (err) {
        console.error('שגיאה בעדכון:', err);
        dispatch(setMessage({ text: 'אירעה שגיאה בעדכון'  , type: 'error' }));

      }
    }
  });


  return (
    <div className="udit-user">
      <div className="udit-user-container">
     <form onSubmit={formik.handleSubmit}>
  <div><strong>שם:</strong> {selectedUser?.name}</div>
  <div><strong>אימייל:</strong> {selectedUser?.email}</div>
  <div><strong>טלפון:</strong> {selectedUser?.phone}</div>


          <label htmlFor="role">תפקיד:</label>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="role-select"
          >
            <option value={1}> עורך</option>
            <option value={0}>מנהל</option>
            <option value={2}>משתמש רגיל</option>
          </select>

          {formik.errors.role && <div className="error">{formik.errors.role}</div>}

          <div className="form-buttons">
            {/* <button type="submit" className="submit-button">שמור</button> */}
               <Tooltip title="שמור">
                         <IconButton type="submit" color="primary">
                           <SaveIcon />
                         </IconButton>
                       </Tooltip>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminchangeRole;

