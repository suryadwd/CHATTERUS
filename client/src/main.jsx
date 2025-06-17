import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<App />
<ToastContainer />
</BrowserRouter>
)
