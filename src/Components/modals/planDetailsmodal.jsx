import React from 'react';
import Modal from 'react-modal';
import  {  useState ,useEffect} from 'react';
import axios from 'axios';
import { baseUrl,userupgrade } from '../../utilits/constants';
const PlanDetailsModal = ({ isOpen, closeModal, }) => {
  const [Plans, setPlans] = useState([]);
  
  useEffect(() => {
  
  const fetchData = async () => {
    console.log("icanteeee");
    try {
      const token = localStorage.getItem('jwtToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      const planresponse =  await axios.get(`${baseUrl}${userupgrade}`, config);
      setPlans(planresponse.data)
      console.log(planresponse.data,"kkkkuyun")
    } catch (error) {
      // Handle errors...
      console.error('Error fetching user data:', error);
    }
  };
  fetchData();
}, []); 


 

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="plans"
      className="fixed inset-0 flex items-center justify-center"
    >
     
      <div className="bg-gradient-to-r from-purple-200 via-teal-300 to-blue-200 p-6 rounded shadow-md" style={{ width: '800px', height: 'auto' }}>
      <p className="text-lg text-gray-800">You have {Plans ? Plans.days_left : ""} days left in your plan.</p>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            >
              Cancel
            </button>
           
          </div>
        </div>

    </Modal>
  );
};

export default PlanDetailsModal;
