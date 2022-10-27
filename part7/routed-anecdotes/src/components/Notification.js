const Notification = ({ message }) => {
    return message ? <div style={{color: 'green', fontWeight: 'bold' }}>{message}</div> : ''
}

export default Notification
