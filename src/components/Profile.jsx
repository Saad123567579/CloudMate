import React  ,{useEffect} from 'react'
import { setUser } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        const Action = async() => {
            if(localStorage.getItem("user")){
                let userData = JSON.parse(localStorage.getItem("user"))
                await dispatch(setUser(userData));
            }
            else {
                navigate("/");
            }
        }
      Action();
    }, [dispatch,navigate])
    
  return (
    <div>
        <Navbar/>
      profile page
    </div>
  )
}

export default Profile
