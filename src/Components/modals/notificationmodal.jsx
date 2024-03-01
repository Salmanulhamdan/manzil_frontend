import React  from 'react'
import { useNavigate } from 'react-router-dom';

import notificationSeenApi from '../../api/notificationSeenAPI';


const NotificationModal = ({ isVisible, onClose, notification, removeNotification }) => {

    

    const navigate = useNavigate();
    

    if( !isVisible ) return null;

    const handleClose = (e) =>{
        console.log("jjjdfresde");
        onClose();
    }

   

    const getNotificationMessage = (notification) => {
        console.log(notification,"notifiacccccto");
        // const { notification_type, post, comment } = notification;
      
        if (notification) {
          if (notification.notification_type === "like") {
            return "liked your post";
          } else if (notification.notification_type=== "comment") {
            return "commented on your post";
          } else if (notification.notification_type === "post") {
            return "created a new post";
          }else if (notification.notification_type === "blocked") {
            return "blocked you post";
          }else if (notification.notification_type === "follow") {
            return "followed you ";
          }

        } 
    };
    const onNotificationClick = async (notificationId, id, notificationType, postId) => {

        try {
            await notificationSeenApi(notificationId)
            removeNotification(notificationId);
            onClose();
            if (notificationType === "like" || notificationType === "comment" || notificationType === "post") {
                // Redirect to the liked post page
                // navigate(`/post/${postId}`); //=== show posta modal here
                
            } else if (notificationType === "blocked") {
                // Redirect to a special "blocked" page
                // navigate(`/blocked`);
            } else {
                // Default redirection (e.g., profile or a general landing page)
               
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
<div
  className="z-10 fixed inset-8  flex justify-start items-start mt-40"
  id="wrapper"
  onClick={handleClose}
>
  <div className="m-2 max-w-sm w-72 z-10 backdrop-filter backdrop-blur flex flex-col bg-white rounded-lg shadow-lg p-4">
    <button
      className="text-black text-xl place-self-end p-2"
      onClick={onClose}
      style={{ border: '1px solid rgba(209, 90, 90, 0.5)', borderRadius: '5px' }}
    >
      x
    </button>
    <div className="bg-white p-4 rounded">
      <div>
        <ul className="mt-2">
          {notification && notification?.length > 0 ? (
            notification.map((note, index) => (
              <li key={note.id} className="border-b-2 border-gray-200 mb-2 last:mb-0">
                <p
                  className="block w-full whitespace-nowrap px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => onNotificationClick(note.id, note.from_user.id, note.notification_type, note.post?.id)}
                >
                  {note.notification_type === 'blocked'
                    ? 'Admin blocked your post'
                    : `${note.from_user} ${getNotificationMessage(note)}`}
                </p>
              </li>
            ))
          ) : (
            <li>
              <p className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm">No notifications</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
</div>

  )
}

export default NotificationModal
