import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../myStore';
import { clearMessage } from '../../redux/messageSlice';
import Toast from 'react-bootstrap/Toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import './MessageToast.scss';

const MessageToast: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message.text) return null;

  const Icon = message.type === 'success' 
    ? CheckCircleIcon 
    : message.type === 'error' 
      ? ErrorIcon 
      : InfoIcon;

  return (
    <Toast
      onClose={() => dispatch(clearMessage())}
      show={!!message.text}
      delay={3000}
      autohide
      className={`custom-toast ${message.type}`}
    >
      <div className="toast-content">
        <Icon className="toast-icon" />
        <Toast.Body className="toast-body">{message.text}</Toast.Body>
      </div>
    </Toast>
  );
};

export default MessageToast;

