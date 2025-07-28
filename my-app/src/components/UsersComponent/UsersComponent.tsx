import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, List, ListItemAvatar, ListItemText, Typography, ListItemButton } from '@mui/material';
import './UsersComponent.scss';
import { Users } from '../../models/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/authslice';
const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8080/users/getall')
      .then(res => setUsers(res.data))
      .catch(err => console.error('שגיאה בטעינת משתמשים:', err));
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const stringToColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 70%)`;
  };

  const handleUserClick = (user: Users) => {
    dispatch(setSelectedUser(user));
    navigate(`/edit-user/${user?.id}`);
  };

  return (
    <div className="users-container">
      <Typography variant="h4" gutterBottom>רשימת משתמשים</Typography>
  <List>
  {users.map((user) => (
    <ListItemButton
      key={user.id}
      onClick={() => handleUserClick(user)}
      sx={{ cursor: 'pointer' }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: stringToColor(user.name) }}>
          {getInitials(user.name)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItemButton>
  ))}
</List>

    </div>
  );
};

export default UsersComponent;
