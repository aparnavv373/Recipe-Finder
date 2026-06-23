import { PiClockCountdownFill } from "react-icons/pi";
import { LuChefHat } from "react-icons/lu";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from './Navbar';


function Recipe_details({result,loading,setLoading,error,setError}){
    const navigate=useNavigate()
    const[isLiked,setIsLiked]=useState(result?.is_favorite||false)
    const[activeTab,setActiveTab]=useState("ingredients")
    console.log(result)
    if (!result) {
  return <div>No recipe found</div>
}
    const id=result.recipe_id
    const Liked=async()=>{
    if(!isLiked){ 
        try{
            setLoading(true)
            const token=localStorage.getItem("token")
       
            const response=await fetch(`http://127.0.0.1:8000/favorites/${id}`,{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}` ,
                    'Content-Type':'application/json',
                
                  },
                })
            if (response.ok){
                const data = await response.json()
                setIsLiked(true)
                setLoading(false)
                console.log(data)
              
              

            }
        
            else{
                setError("Authentication failed")
                setLoading(false)

            }
       }catch(error){
        setLoading(false)
        setError("API failed")
        }
    }
    else{

        try{

            setLoading(true)
            const token=localStorage.getItem("token")
            const response=await fetch(`http://127.0.0.1:8000/favorites/${id}`,{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${token}`
                },
            })
            if (response.ok){
                const data = await response.json()
                setIsLiked(false)
                setLoading(false)
                console.log(data)

                }
            else{
                setError("Authentication failed")
                setLoading(false)

            }
        }
        catch(error){
            setLoading(false)
            setError("Api failed")
        }

        
           
        
    }
     }
    
 
 console.log(result.recipe.steps)
return(
    <div className='min-h-screen bg-[#D3EEE1]  p-6 '>
     <Navbar/>
    <div className=" w-full  mx-auto mt-8 bg-white  backdrop-blur-md  shadow-xl p-6 rounded-3xl lg:p-10 relative " >

      
       <div onClick={Liked} className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md">
        {isLiked?(<MdFavorite className="text-red-500 text-3xl"/>)
        :(<MdFavoriteBorder className="text-gray-500 text-3xl"/>)}

       </div>
       <div className="flex flex-col md:flex-row gap-8">

        <div className="md:w-[320px] lg:w-[350px] shrink-0">
           <div className="w-full h-64 lg:h-80 bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
  <img
    src={result.image}
    className="w-full h-full object-contain"
    alt={result.recipe.recipe}
  />
</div>
            <div className="bg-[#D3EEE1] rounded-2xl p-5 mt-4 space-y-4">
            <div className="flex items-center gap-3">
                <div>
                    <LuChefHat  className="text-3xl" />
                </div>
                 <div>
                    <h2 className="font-semibold">Difficulty</h2>
                    <p>{result.recipe.difficulty }</p>
                 </div>

                 
             </div>
             <div className="flex items-center gap-2">
                <div >
                    <PiClockCountdownFill className="text-3xl" />
                </div>
                 <div>
                    <h2 className="font-semibold">Cooking</h2>
                    <p>{result.recipe.cooking_time}</p>
                 </div>
                 
                 
             </div>
               <div className="flex items-center gap-2">
                <div >
                    < GiForkKnifeSpoon  className="text-3xl" />
                </div>
                 <div>
                    <h2 className="font-semibold">Servings</h2>
                    <p>{result.recipe.servings }</p>
                 </div>
                 
                 
             </div>

             </div>
                 
            
        </div>
         <div className="flex-1">
        <h1 className="text-3xl text-center lg:text-left lg:text-5xl font-bold">{result.recipe.recipe}</h1>
         <p className="text-gray-600 text-center lg:text-left leading-relaxed mt-4">{result.recipe.description}</p>
         <div  className="flex justify-center mt-6">
         <div className="bg-[#297B41] w-fit p-2 flex gap-2 rounded-full mt-6">

       

            <button className={`text-lg font-bold  px-2 md:px-4 rounded-4xl p-2 ${activeTab=="ingredients"?"bg-[white] text-[#297B41]":"bg-[#297B41] text-[white]"}`} onClick={()=>setActiveTab("ingredients")}>Ingredients</button>

            <button className={`text-lg font-bold  px-2 md:px-4  rounded-4xl p-2 ${activeTab=="instructions"?"bg-[white] text-[#297B41]":"bg-[#297B41] text-[white]"}`} onClick={()=>setActiveTab("instructions")}>Instructions</button>

             </div>
        </div>

    <div className="bg-gray-50 rounded-2xl p-6 mt-6">

        {activeTab=="ingredients"&&(

            <ul className="list-disc list-inside space-y-2 mt-6">

            {result.recipe.ingredients.map((ingredient,index)=>

            <li  key={index}><span className="font-bold">{ingredient.name}</span>{"  -  "}{ingredient.quantity}</li>)}

        </ul>

        )}

            

         {activeTab=="instructions"&&(

                         <ol className=" list-decimal list-inside space-y-3 mt-6">

            {result.recipe.steps.map((step,index)=><li className="text-[black]" key={index}>{step}</li>)}

        </ol>

         )} 



       

    </div>

       </div>
       </div>
      
       

   

        <div className="flex justify-center mt-8">

            <button className=" bg-[#297B41] px-6 py-3  text-[white] rounded-xl" onClick={()=>navigate("/recipe")}>Back</button>

      



        </div>

       
   
         
       
      
        

   
    </div>

    </div>
)
}
export default Recipe_details