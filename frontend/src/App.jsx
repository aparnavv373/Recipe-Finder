import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Recipe from "./components/Recipe"
import Recipe_details from "./components/Recipe_details"
import Favorites from "./components/Favorites"
import History from "./components/History"
import { useState } from "react"
import About from "./components/About"
function App(){
    const[recipename,setRecipeName]=useState("")
    const[result,setResult]=useState(null)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    
    
    
return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/recipe"
             element={<Recipe 
             recipename={recipename} 
             setRecipeName={setRecipeName}
             result={result}
             setResult={setResult}
             loading={loading}
             setLoading={setLoading}
             error={error}
             setError={setError}
             
             />}></Route>
            <Route path="/details" element={<Recipe_details 
            
            result={result}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            
            />}></Route>
            <Route path="favorites" element={<Favorites loading={loading} setLoading={setLoading} error={error} setError={setError} result={result} setResult={setResult}/>}>

            </Route>
            <Route path="history" element={<History error={error} setError={setError} result={result} setResult={setResult}/>}></Route>
            
           

        </Routes>
       
    
    
    
    </BrowserRouter>
    
)
}

export default App
