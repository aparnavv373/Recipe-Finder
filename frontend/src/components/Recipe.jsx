import Chef from '../assets/chef.png'
import { useEffect } from 'react'
import { MdSearch } from "react-icons/md";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


function Recipe({recipename,setRecipeName,result,setResult,loading,setLoading,error,setError}){
    useEffect(() => {
    setError("")
}, [])
const searches=[
    "chicken Biriyani",
    "Butter Chicken",
    "Pasta",
    "Pizza", 
    "Fried Rice",
    "Cheese Cake"
]
    const navigate=useNavigate()
    const handlesearch=async (event) => {
        setError("")
        if(recipename.trim()===""){
            setError("Enter recipe name")
            return
        }
        setLoading(true)
        setResult(null)
       

        try{
        const token=localStorage.getItem("token")
        
       
          const response=await fetch("http://127.0.0.1:8000/generate-recipe",{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}` ,
                'Content-Type':'application/json',
                
                  },
            body:JSON.stringify({
                    recipe_name:recipename,
                    
                  }),
            })
        if (response.ok){
              const data = await response.json()
              setResult(data)
              setRecipeName("")
              setError("")
              setLoading(false)
              navigate("/details")
              return
              

            }

        setError("Authentication failed")
        setLoading(false)
        
        }catch(error){
        setLoading(false)
        setError("API failed")
        }
     }
   
return(
    <div className='min-h-screen bg-[#D3EEE1] pt-4 p-6 overflow-hidden '>
        
        <Navbar/>
    <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20'>
        <div className='w-full flex flex-col gap-6 items-center lg:items-start text-center lg:text-left'>
        <h1 className='w-full text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight'>Cook Something <span className='text-[#297B41] block'>Amazing Today</span></h1>
        <p className='text-gray-600 text-lg '>Tell our AI chef what you'd like to eat and get a personalized recipe in seconds.</p>
        <img src={Chef} className='w-72 sm:w-80 md:w-96 lg:w-[450px] mx-auto lg:mx-0 hover:scale-105 transition duration-300'></img>
        </div>
        <div className=''>
            <div className='bg-white w-full max-w-4xl p-10 md:p-12 rounded-lg shadow-black/10  flex flex-col gap-6'>
                <h2 className='font-bold text-3xl text-center'> Search Recipe</h2>
                <p className=' text-gray-600 text-center '>What would you like to cook Today?</p>
                <div className='relative'>
                     <input type='text' placeholder='Search recipes(e.g.Chicken Biriyani)' className='shadow-lg rounded-full border border-gray-200 w-full h-14 px-6 pr-14 outline-none focus:border-[#297B41]' value={recipename} onChange={(e)=>{
                        setRecipeName(e.target.value)
                         setError("")}}
                          onKeyDown={(e)=>{if(e.key === "Enter"){
                        handlesearch()}}}></input>
                      <button className='absolute right-2 top-2 bg-[#297B41] text-white p-2 rounded-full' onClick={handlesearch}><MdSearch size={24}/></button>
                    
                </div>
                  {loading &&(
                        <p className='text-center text-[#297B41]'>Generating recipe...</p>
                      )}
                       {error &&(
                        <p className='text-center text-red-500'>{error}</p>
                      )}

                
                <div className=''>
                    <h4 className='text-center mb-4'>Popular searches</h4>
                    <div className='flex flex-wrap justify-center gap-3'>
                        {searches.map((recipe)=>(
                            <button key={recipe} className='bg-[#D3EEE1]  text-[#297B41] px-4 py-2 rounded-full font-medium hover:bg-[#bde0cf] transition ' onClick={()=>{setRecipeName(recipe)}}>{recipe}</button>
                        )
                    )}
                    </div>
                </div>
               
            </div>
        </div>
        </div>

    </div>
)

       

}
export  default Recipe