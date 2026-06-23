import { useState } from 'react'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import Hat from '../assets/hat.png'
import Logout from './Logout';
function Navbar(){
    const[isopen,setIsOpen]=useState(false)
    const [showLogout, setShowLogout] = useState(false);
return(
     <nav className="bg-[white] md:flex  rounded-3xl  px-6 py-3 shadow-lg mb-8 ">
                <div className=' flex items-center justify-between w-full'>
                <img src={Hat} alt="Recipe finder logo" className='w-12 rounded-full  '></img>
                 <ul className="md:flex gap-4 items-center hidden font-bold ">
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/">Home</Link></li>
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/recipe">Recipes</Link></li>
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/history">History</Link></li>
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><Link to="/favorites">Favorites</Link></li>
                    <li className='rounded-full hover:bg-[#297B41] p-4 py-1 hover:text-white'><button onClick={()=>setShowLogout(true)}>Logout</button></li>
                </ul>
                
                <div className='md:hidden  text-3xl transition-all duration-300 'onClick={()=>setIsOpen(!isopen)}>
                    {isopen?<IoIosClose />:<RxHamburgerMenu />}
                </div>
               
                </div>
                {isopen&&(
                    <ul className="flex  flex-col gap-4 items-center md:hidden font-bold py-4">
                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/recipe" onClick={() => setIsOpen(false)}>Recipes</Link></li>
                    <li><Link to="/history" onClick={() => setIsOpen(false)}>History</Link></li>
                    <li><Link to="/favorites" onClick={() => setIsOpen(false)}>Favorites</Link></li>
                    <li><button onClick={()=>{
                        setIsOpen(false)
                        setShowLogout(true)
                        }}>Logout</button></li>
                </ul>
                )}
                {showLogout &&(
                    <Logout onCancel={()=> setShowLogout(false)}/>
                )}
            </nav>
)
}
export default Navbar