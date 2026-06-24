import { useState,useEffect} from "react"
import { FaGreaterThan } from "react-icons/fa";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import Chef from '../assets/chef.png'
function Favorites({setError,setResult}){
   
    const[favorites,setFavorites]=useState({page:1,limit:8,favorites:[]})
    const[loadingFavorites,setLoadingFavorites]=useState(true)
    const [openingRecipe, setOpeningRecipe] = useState(false)
    const API_URL=import.meta.env.VITE_API_URL
    const[page,setPage]=useState(1)
    const navigate=useNavigate()
    const handlefavorites=async()=>{
        try{
            setLoadingFavorites(true)
            const token=localStorage.getItem("token")
            const response=await fetch(`${API_URL}/favorites?page=${page}&limit=8`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            if (response.ok){
                const data=await response.json()
                setFavorites(data)
               
            }
            else{
                setError("Authentication failed")
            }
        }
        catch(error){
               setError("API failed")
        }finally{
            setLoadingFavorites(false)
        }
    
    }
    useEffect(()=>{
        handlefavorites()
    },[page])
    const handledetails=async(recipe_id)=>{
        try{
            setOpeningRecipe(true)
            const token=localStorage.getItem("token")
            const response=await fetch(`${API_URL}/details/${recipe_id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            
            })
            if (response.ok){
                const data=await response.json()
                setResult(data)
                navigate("/details")
            }
            else{
                setError("Authentication failed")
            }
        }
        catch(error){
            setError("API failed")
        }finally{
            setOpeningRecipe(false)
        }
    }

    
return(
  <div className="bg-[#D3EEE1]  min-h-screen p-8">
         <Navbar/>
    

   <h1 className="font-extrabold  text-center mt-8 mb-8 text-3xl md:text-5xl font-bold ">My Cook<span className="text-[#297B41]">Book</span></h1>
            {loadingFavorites && (
    <p className="text-center text-green-300 animate-pulse mb-6">
        Loading recipes...
    </p>
)}
{openingRecipe && (
    <p className="text-center text-green-300 animate-pulse mb-4">
        Opening recipe...
    </p>
)}
{!loadingFavorites && favorites.favorites.length === 0 && (
  <div className="text-center text-gray-400 mt-16">
    No favorite recipes yet 🍲
    <img src={Chef} className="w-48 mx-auto mt-6 opacity-70"></img>
  </div>
)}
       
<div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ' >
                        {favorites.favorites.map((favorite,index)=>(
                            <div key={index} className='bg-[white] h-full flex  flex-col items-center rounded-3xl p-4 gap-4 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' onClick={()=>handledetails(favorite.recipe_id)}>
                                <img src={favorite.image} className=' w-full  object-cover h-64 rounded-xl'></img>
                                <h3 className='text-xl font-bold line-clamp-2 text-center'>{favorite.name  .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}</h3>
                                   <p className="text-gray-500 text-sm mt-1">
                                         AI Generated Recipe
                                </p>
                                <div className="mt-auto flex items-center gap-3 text-[#297B41] font-medium"> View Full Details <span><FaArrowRight /></span></div>

                            </div>
                        ))}
                      
                    </div>
{favorites.favorites.length!=0 &&(
<div className="flex justify-center items-center  gap-4 mt-8 text-white">
    <button
        disabled={page===1}
        onClick={() => page > 1 && setPage(page - 1)}
        className="p-2 bg-white  text-[#297B41] rounded"
    >
        <FaLessThan />
    </button>

    <span className="text-[#297B41]">Page {page}</span>
   <button
        disabled={page>=favorites.total_pages}
        onClick={() => setPage(page + 1)}
        className="p-2 bg-white text-[#297B41]  rounded"
        
    >
        <FaGreaterThan />
    </button>
</div>
)}

</div>

)
}
export default Favorites