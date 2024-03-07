import './admin_side.css';
import { baseUrl } from '../../utilits/constants';
import { Link } from 'react-router-dom';



function AdminSide(){
    return(
<div className="admin_box bg-gray-100 p-4 col-span-1">
  <h1 className="admin_side_title_txt text-2xl font-bold mb-4">Admin</h1>
  <ul className="space-y-4">
    <li className="admin_dash_link py-2 text-gray-800 hover:text-blue-500 cursor-pointer">
      <Link to='/admin/chart' className='admin_chart'>
    
        Dashboard
      </Link>
    </li>

    <li className="admin_user py-8 text-gray-800 hover:text-blue-500 cursor-pointer">
      <Link to='/admin/admindash' className='admin_user_link'>
        
        Users
      </Link>
    </li>

    <li className="admin_user py-8 text-gray-800 hover:text-blue-500 cursor-pointer">
      <Link to='/admin/plans' className='admin_user_link'>
   
        Plans
      </Link>
    </li>

    <li className="admin_user py-8 text-gray-800 hover:text-blue-500 cursor-pointer">
      <Link to='/admin/report' className='admin_user_link'>
        
        Reports
      </Link>
    </li>
  </ul>
</div>

    
    )
}


export default AdminSide