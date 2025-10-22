import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Splash } from './pages/Splash'
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Auth';
import { Toaster } from 'sonner';
import { Login } from './pages/Login';
import { Forgot } from './pages/Forgot';
import { Verification } from './pages/Verification';
import { Home } from './pages/Home';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* wrap with auth layout  */}
      <Route index element={<Splash/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="forgot" element={<Forgot/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="verify" element={<Verification/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Route>

  )
);

function App() {
  return (
    <>
      <Toaster position='top-center'  richColors duration={3000}/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
