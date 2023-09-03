import React  ,{useEffect} from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import { query, where, getDocs, addDoc } from 'firebase/firestore';
import { userRef } from '../firebase';
import {setUser} from "../redux/authSlice"
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
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
     if(data.password !== data.cpassword){
        return toast.info("Password Doesnt Match");
     }
     const firestoreQuery1 = query(userRef, where("email", "==", data.email));
     const fetchedAllUsers = await getDocs(firestoreQuery1);
     if (fetchedAllUsers.docs.length === 0) {
        await addDoc(userRef, data);
        await dispatch(setUser(data));
        localStorage.setItem("user",JSON.stringify(data))
        toast.success("User Created")
        navigate("/profile");
        
      } else {
        return toast.info("Email already in use");

      }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
                </div>
                <form className="mt-8 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                {...register("name", { required: true,minLength:3})}

                            />
                        </div>
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
                                {...register("email", {
                                    required: 'Email is required',
                                    minLength: {
                                      value: 3,
                                      message: 'Email must be at least 3 characters',
                                    },
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                      message: 'Invalid email address format',
                                    },
                                  })}

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
                                {...register("password", { required: true,minLength:3})}

                            />
                        </div>
                        <div>
                            <label htmlFor="cpassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="cpassword"
                                name="cpassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder=" Confirm Password"
                                {...register("cpassword", { required: true,minLength:3})}

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
                            
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md "
                        >
                            Already have an account?
                            <br />
                            <Link to="/">Log in here</Link>
                            
                        </h1>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Signup
