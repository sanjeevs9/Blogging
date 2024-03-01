
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Blog from "./components/Blog.tsx"
import Signup from './components/Signup.tsx'
import Signin from './components/Signin.tsx'
import Help from './components/Help.tsx'

function App() {
  
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<Help/>}/>
    <Route path='/blog' element={<Blog/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path ='/signup' element={<Signin/>}/>
   </Routes>

    </BrowserRouter>
    
  )
}

export default App
