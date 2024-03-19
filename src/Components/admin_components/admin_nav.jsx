import './admin_nav.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from '../../utilits/constants';


function AdminNav() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwtTokenAdmin');
    localStorage.removeItem("refreshjwtTokenAdmin")

    navigate('/admin')
  }
  return (
    <div className='admin_navbar'>

      <div className='fixed top-4 right-8 z-50'>
        <span onClick={handleLogout} className='text-white bg-red-500 px-3 py-2 rounded cursor-pointer'>Log Out</span>
      </div>
    </div>
  );
}

export default AdminNav;
