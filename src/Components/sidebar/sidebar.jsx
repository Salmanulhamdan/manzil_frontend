
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox,faUser ,faCircleQuestion,faMessage,faBell} from '@fortawesome/free-solid-svg-icons';
import NotificationModal from '../modals/notificationmodal';
import { useState,useEffect } from 'react';
import getNotificationsApi from '../../api/getNotifacationAPI';

function SideBar({username,onToggleComponent}){


  

  const [showNotify, setShowNotify] = useState(false);
  const [notification, setNotification] = useState([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data = await getNotificationsApi();
        setNotification(data);
        console.log("notificationnnnn",data);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, []);

    
  useEffect(() => {
    if (token) {
      console.log("notification websocket calling")
      const websocketProtocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      // const socket = new WebSocket(`${websocketProtocol}//127.0.0.1:8000/ws/notification/?token=${token}`);
      const socket = new WebSocket(`${websocketProtocol}backend.manzil.fun/ws/notification/?token=${token}`);
    
      console.log(socket,"notification socket")

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        console.log(event,"notification socket event ")
        console.log(event.data,"evendaaataaa");
        const newNotification = JSON.parse(event.data);
        console.log(newNotification,"new notification");
        if (newNotification.type === "notification") {
          setNotification((prevNotifications) => [
            ...prevNotifications,
            newNotification.payload,
          ]);
        }
        
      };
      socket.onerror = (error) => {
console.error(error);
};
      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
      };

      return () => {
        socket.close();
      };
    }
  }, [token]);


  const removeNotification = (notificationIdToRemove) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    );
  };



 

    return(
<div className="box2 bg-white p-4 shadow-md fixed w-64 mt-40 ml-16  b" style={{border: '2px inset #64E3E3', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
  {/* My Profile */}
  <div className="myprofile flex items-center mb-12 p-4 bg-white shadow-md rounded-lg">
  <FontAwesomeIcon icon={faUser} className="text-black mr-2" />
  <div className="flex flex-col">
    {username ? (
      <>
        <Link to="/myprofile" className="myprofile_text font-bold text-lg">
          {username}
        </Link>
 
      </>
    ) : (
      <Link to="/myprofile" className="myprofile_text font-bold text-lg">
        My Profile
      </Link>
    )}
  </div>
</div>



<div className="flex items-center mt-4 mb-10">
    <FontAwesomeIcon icon={faBell} /> 
    <button
      className="ml-2 relative"
      onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
      onClick={() => setShowNotify(true)}
    >
      Notifications
      {notification?.length > 0 && (
        <span className="absolute -top-4 -right-8  shadow-md text-black px-2 py-1 rounded-full">
          {notification?.length}
        </span>
      )}
    </button>
  </div>
  {showNotify && (
    <div className="relative right-0 top-0 mt-4 mr-4 ">
      <NotificationModal
        isVisible={showNotify}
        onClose={() => setShowNotify(false)}
        notification={notification}
        removeNotification={removeNotification}
      />
    </div>
  )}

  <div className="flex items-center mt-4 mb-10">
    <FontAwesomeIcon icon={faToolbox} />
    <span
      className="ml-2"
      onClick={() => onToggleComponent('myrequirment')}
      onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
    >
      My Requirements
    </span>
  </div>

  <div className="flex items-center mt-4 mb-10">
    <FontAwesomeIcon icon={faCircleQuestion} />
    <span
      className="ml-2"
      onClick={() => onToggleComponent('myquestions')}
      onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
    >
      My Questions
    </span>
  </div>

  <div className="flex items-center mt-4 mb-6">
    <FontAwesomeIcon icon={faMessage} className="text-black" />
    <span
      className="ml-2"
      onClick={() => onToggleComponent('message')}
      onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
    >
      Messages
    </span>
  </div>
  </div>

    )
}


export default SideBar