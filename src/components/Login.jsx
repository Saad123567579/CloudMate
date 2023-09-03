import React ,{useEffect} from 'react'
import "../index.css";
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { query, where, getDocs } from 'firebase/firestore';
import { userRef } from '../firebase';
import { setUser } from "../redux/authSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const Action = async() => {
            if(localStorage.getItem("user")){
                let userData = JSON.parse(localStorage.getItem("user"))
                await dispatch(setUser(userData));
                navigate("/profile");
            }
            else {
                
            }
        }
      Action();
    }, [dispatch,navigate])
    const {
        register,
        handleSubmit,

    } = useForm();
    const onSubmit = async (data) => {

        const firestoreQuery1 = query(userRef, where("email", "==", data.email));
        const fetchedAllUsers = await getDocs(firestoreQuery1);
        if (fetchedAllUsers.docs.length === 0) {
            return toast.info("Invalid email or password");
        } else {
            const userData = fetchedAllUsers.docs[0].data();
            await dispatch(setUser(userData));
            localStorage.setItem("user", JSON.stringify(userData));
            toast.success("Login Successful");
            navigate("/profile");


        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register("email", { required: true, minLength: 3 })}

                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register("password", { required: true, minLength: 3 })}

                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log in
                        </button>
                    </div>
                    <div>
                        <h1
                           
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
                        >
                            New to CloudMate? <Link to="/signup" >Sign up here</Link>
                        </h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
