
const Notification = ({ message, messageType }) => {
    message = message || "\u00A0";

    return (
        <div id="notification" className={messageType || ""}>{message}</div>
    );
};

export default Notification;
