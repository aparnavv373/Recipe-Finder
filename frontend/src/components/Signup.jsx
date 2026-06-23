
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeNavBar from './HomeNavBar'

function Signup(){
  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirm,setConfirm]=useState("")
  const[passworderror,setPasswordError]=useState("")
  const[emailerror,setEmailError]=useState("") 
  const[error,setError]=useState("")
  const navigate=useNavigate()
  const handleSend=async () => {
     setEmailError("")
     setPasswordError("")
     setError("")
     if(!username||!email||!password||!confirm){
      setError("All fields required")
      return
     }
           
    
     if(password!==confirm){
      setPasswordError("Password mismatch")
      return;
     }
        
     
         
      try{
       
          const response=await fetch("http://127.0.0.1:8000/signup",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                  },
            body:JSON.stringify({
                    username:username,
                    email:email,
                    password:password
                  }),
            })
      if(response.status===409){
              setEmailError("Email already registered")
              return
            }
      if (!response.ok) {
           setError("Signup failed")
           return
         }
      if (response.ok){
              navigate("/login")
            }
      
      } catch(error){
            setError("Signup failed")
        }
     }
  
 
return(
    <div className='min-h-screen bg-[#D3EEE1] relative overflow-hidden py-6 '>
      <div className='p-4'>
          <HomeNavBar />
      </div>
    
      <div className=' flex flex-col lg:flex-row min-h-[calc(100vh-120px)]'>
     <div className='space-y-5 max-w-xl mx-auto lg:mx-0 lg:space-y-6 lg:w-1/2 flex flex-col  justify-center px-8 lg:px-16 py-8 text-center lg:text-left lg:py-0 z-10'>
       <h1 className='font-extrabold text-4xl sm:text-5xl  lg:text-7xl  leading-tight'>Create Your <span className='text-[#297B41]'>Recipe </span>Journey</h1>
       <p className='max-w-lg mt-6 text-base md:text-lg text-gray-600'>Sign Up to discover AI-generated recipes, save your favorites, and continue building your personal cookbook.</p>
      
     </div>
    
  
  <div className='  w-full lg:w-1/2  flex   lg:rounded-l-[60px] rounded-t-[50px]  lg:rounded-t-none items-center justify-center pt-12 p-6 flex-1'>
      <div className='bg-[white]  border rounded-[40px]  border-gray-200   shadow-lg shadow-gray-400/50 flex  flex-col space-y-8 p-6 md:p-10 w-full  max-w-md '>
      <div className='space-y-2'>
        <h1 className='text-center text-4xl font-bold'>Sign up</h1>
        

        <h3 className='text-center  text-gray-500  text-sm '>Create Your account</h3>
      </div>

        <div className='flex flex-col space-y-4'>
            <input type='text' className=' py-2 border-b-2 border-gray-300 bg-transparent py-2 focus:border-[#297B41] outline-none  ' placeholder='Username' value={username} 
            onChange={(e)=>{
            setUsername(e.target.value)
            setError("")}}></input>
            <input type='email'className='  py-2 border-b-2 border-gray-300 bg-transparent py-2  focus:border-[#297B41] outline-none ' placeholder='Email' value={email} 
            onChange={(e)=>{
              setEmail(e.target.value)
              setEmailError("")
              setError("")}}></input>
              {emailerror&&( 
              <p className='text-red-500 text-sm'>{emailerror}</p>
            )}
            <input type='password'className= ' py-2 border-b-2 border-gray-300 bg-transparent py-2  focus:border-[#297B41] outline-none  ' placeholder='Password' value={password} 
            onChange={(e)=>{
              setPassword(e.target.value)
              setPasswordError("")
              setError("")}}></input>
            <input type='password'className= ' py-2 border-b-2 border-gray-300 bg-transparent py-2   focus:border-[#297B41] outline-none  ' placeholder='Confirm Password' value={confirm} 
            onChange={(e)=>{
              setConfirm(e.target.value)
              setPasswordError("")
              setError("")}}></input>
            {passworderror && (
              <p className='text-red-500 text-sm'>{passworderror}</p>
            )
            }
            {error && (
               <p className='text-red-500 text-sm'>{error}</p>
          
            )}
             
    
        </div>
        <button className='bg-[#297B41]  w-full py-2 rounded-lg text-white font-semibold hover:bg-[#236937] transition duration-300' onClick={handleSend}>Sign up</button>
        <p className='text-center text-sm'>Already have account ? <span className='text-[#297B41] cursor-pointer' onClick={()=>navigate("/login")}>Login Here</span></p>
        
      </div>
  </div>
</div>
</div>
)
}
export default Signup