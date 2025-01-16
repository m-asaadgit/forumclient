import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import Store from "./redux/Store.jsx"
import logo from "./assets/logo.png"; // Replace this with the path to your imported image

// Dynamically set the favicon
const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = logo;
document.head.appendChild(link);

createRoot(document.getElementById('root')).render(
  <Provider
  store={Store}
  >

      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
  </Provider>


)
