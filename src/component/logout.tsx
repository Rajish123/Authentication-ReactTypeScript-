import React from 'react'
import { useAppDispatch } from '../store/store'
import { logout } from '../store/features/authSlice';
import { useNavigate } from 'react-router-dom';


const Logout:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }
  return (
    <div className='logoutClass'>
        <form onSubmit={handleSubmit}>
            <label>Are you sure you want to Logout?</label>
            <button type = "submit">Okay</button>
        </form>
    </div>
  )
}

export default Logout
