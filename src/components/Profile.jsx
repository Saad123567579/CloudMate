import React  ,{useEffect} from 'react'
import { setUser } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
                navigate("/login");
            }
        }
      Action();
    }, [dispatch,navigate])
    
  return (
    <div>
      profile page
    </div>
  )
}

export default Profile
