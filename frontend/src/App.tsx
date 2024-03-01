
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Blog from "./components/Blog.tsx"
import Signup from './components/Signup.tsx'
import Signin from './components/Signin.tsx'
import Help from './components/Help.tsx'
import Quote from './components/Quote.tsx'

function App() {
  
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<Quote/>}/>
    <Route path='/blog' element={<Blog/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path ='/signin' element={<Signin/>}/>
   </Routes>

    </BrowserRouter>
    
  )
}

export default App
