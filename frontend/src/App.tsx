
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Blogs from "./components/Blogs.tsx"
import Signup from './components/Signup.tsx'
import Signin from './components/Signin.tsx'
import Quote from './components/Quote.tsx'
import Write from './components/Write.tsx'

function App() {
  
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<Quote/>}/>
    <Route path='/blogs' element={<Blogs/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path ='/signin' element={<Signin/>}/>
    <Route path="/blogs/write" element={<Write/>}/>
   </Routes>

    </BrowserRouter>
    
  )
}

export default App
