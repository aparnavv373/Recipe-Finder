import { useNavigate } from "react-router-dom"
function Logout({ onCancel }){
    const navigate=useNavigate()
return(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  overflow-y-auto flex items-center justify-center p-4 z-50 ">
        <div className=" flex flex-col gap-2 bg-[white] p-8 rounded-xl">
              <p className="text-md font-bold">Are you sure you want to Logout ?</p> 
        <div className="flex justify-evenly">
<button  className='bg-[#297B41] text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300' onClick={()=>{localStorage.removeItem("token")
            navigate("/login")
        }}>Yes</button>
        <button  className='bg-[#297B41] text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300' onClick={onCancel}>Cancel</button>
        </div>
        </div>
        
      
    </div>
)
}
export default Logout