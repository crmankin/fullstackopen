
const Notification = ({ message, messageType }) => {
    if (message === null) return null;
    if (messageType === null) messageType = 'success';

    return (
        <div className={messageType}>
            {message}
        </div>
    );
};

export default Notification;
