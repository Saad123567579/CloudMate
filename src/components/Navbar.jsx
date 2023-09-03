import React from 'react';
import { useSelector } from 'react-redux';
function Navbar() {
    let user = useSelector((state)=>state?.auth?.user)
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold ">
            Cloud Mate
          </div>
          <img className='rounded-full h-12 w-12' alt="img" src={user?.image}/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
