
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HomeNavBar from './HomeNavBar'
function Login(){
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState("")
  const navigate=useNavigate()
  const validateData=async ()=>{
    setError("")
    if (!email || !password) {
      setError("All fields required")
      return
    }
     try{
       
          const response=await fetch("http://127.0.0.1:8000/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                  },
           
            body:JSON.stringify({
              email:email,
              password:password
            }),
          })
       
      if (response.ok){
            const data = await response.json()
            localStorage.setItem("token", data.access_token)
            navigate("/recipe")
            }
      if(!response.ok){
        setError("Invalid credientials")
        return
      }
      }catch(error){
            setError("Login falied")
        }
  }
return(

  
<div className='min-h-screen  bg-[#D3EEE1] relative overflow-hidden '>
   <div className='p-4'>
          <HomeNavBar />
      </div>
    
<div className=' flex flex-col lg:flex-row min-h-[calc(100vh-120px)]'>
<div className='space-y-5 max-w-xl mx-auto lg:mx-0 lg:space-y-6 lg:w-1/2 flex flex-col  justify-center px-8 lg:px-16 py-8 text-center lg:text-left lg:py-0 z-10'>
  <h1 className='font-extrabold text-4xl sm:text-5xl  lg:text-7xl  leading-tight'> Welcome Back, <span className='text-[#297B41]'>Chef!</span></h1>
  <p className='max-w-md mt-6 text-base md:text-lg  text-gray-600'>Sign in to discover AI-generated recipes, save your favorites, and continue building your personal cookbook.</p>
 
</div>
  <div className=' w-full lg:w-1/2  flex   lg:rounded-l-[60px] rounded-t-[50px]  lg:rounded-t-none items-center justify-center pt-12 p-6 flex-1'>
      <div className='bg-[white]  border rounded-[40px]  border-gray-200   shadow-lg shadow-gray-400/50 flex  flex-col space-y-8 p-6 md:p-10 w-full  max-w-md '>
      <div className='space-y-2'>
        <h1 className='text-center text-4xl font-bold'>Login</h1>
        <h3 className='text-center  text-gray-500  text-sm '>Login to continue</h3>
      </div>

        <div className='flex flex-col space-y-4'>
           
            <input type='email'className='  py-2 border-b-2 border-gray-300 bg-transparent py-2 outline-none focus:border-[#297B41]' placeholder='Email' value={email}
             onChange={(e)=>{
              setEmail(e.target.value)
              setError("")}}></input>
            <input type='password'className= ' py-2 border-b-2 border-gray-300 bg-transparent py-2 outline-none focus:border-[#297B41]' placeholder='Password' value={password} 
            onChange={(e)=>{
              setPassword(e.target.value)
              setError("")}}></input>
            {error &&(
               <p className='text-[red] text-sm'>{error}</p>
            )}  
           
             
        </div>
        <button className='bg-[#297B41]  w-full py-3 rounded-lg text-white font-semibold hover:bg-[#236937] transition duration-300 'onClick={validateData}>Login</button>
        <p className='text-center text-sm'>Don't have account? <span className='text-[#297B41] cursor-pointer'onClick={()=>{navigate("/signup")}}>Signup here</span></p>
        
      </div>
  </div>
</div>
</div>


)
}
export default Login