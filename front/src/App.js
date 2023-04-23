import './App.scss';
import Index from './views/index';
import Navi from './components/Navbar';
import Staffs from './views/staffs';
import {
   createBrowserRouter,
   createRoutesFromElements,
   Navigate,
   Route,
   RouterProvider,
} from 'react-router-dom';
import { setAuthToken } from './components/setAuthToken';
import Admin from './views/AdminProfile';
import Announcements from './views/Announcements';
import Announcement from './views/Announcement';
import axios from 'axios';
import Gallery from './views/Gallery';

const token = localStorage.getItem('token');
if (token) {
   console.log(token);
   setAuthToken(token);
}

const router = createBrowserRouter(
   createRoutesFromElements(
      <>
         <Route path="/">
            <Route path="" element={<Index />} />
            <Route path="staffs" element={<Staffs />} />
            <Route path="admin" element={<Admin />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="announcements" element={<Announcements />} />
            <Route
               element={<Announcement />}
               path=":id"
               loader={async ({ params }) => {
                  return axios.get('/api/announcement/' + params.id);
               }}
            />
         </Route>
      </>
   )
);

function App() {
   return (
      <div className="App">
         <Navi />
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
