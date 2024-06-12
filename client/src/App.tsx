import './App.css'
import FileUpload from './pages/FileUpload'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
    <FileUpload/>
    <ToastContainer/>
    </>
  )
}

export default App
