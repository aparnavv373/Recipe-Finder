import { useState } from 'react'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import Hat from '../assets/hat.png'
function HomeNavBar(){
    const[isopen,setIsOpen]=useState(false)
return(
     <nav className="bg-[white]    rounded-3xl  px-6 py-3 shadow-lg mb-8 ">
                <div className=' flex items-center justify-between w-full'>
                <img src={Hat} alt="Recipe Finder Logo" className='w-12 rounded-full  '></img>
                 <ul className="md:flex gap-4 items-center hidden font-bold ">
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/about">About</Link></li>
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/signup">Signup</Link></li>
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/login">Login</Link></li>
                </ul>
                
                <div className='md:hidden  text-3xl transition-all duration-300 'onClick={()=>setIsOpen(!isopen)}>
                    {isopen?<IoIosClose />:<RxHamburgerMenu />}
                </div>
               
                </div>
                {isopen&&(
                    <ul className="flex  flex-col gap-4 items-center md:hidden font-bold py-4">
                    <li><Link to="/about" onClick={()=>setIsOpen(false)}>About</Link></li>
                    <li><Link to="/signup" onClick={()=>setIsOpen(false)}>Signup</Link></li>
                    <li><Link to="/login" onClick={()=>setIsOpen(false)}>Login</Link></li>
                </ul>
                )}
            </nav>
)
}
export default HomeNavBar