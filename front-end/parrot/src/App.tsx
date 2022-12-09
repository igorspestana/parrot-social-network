//IMPORTS/////////////////////////////
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./Pages/Login";
import "./index.css";
import SignUp from './Pages/SignUp';

//FUNÇÃO QUE DEFINE AS ROTAS/////////////////////////////
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

function App() {
  return < RouterProvider router={router} />
}

export default App
