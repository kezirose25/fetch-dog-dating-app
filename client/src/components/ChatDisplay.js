import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import {useState, useEffect} from "react"


const ChatDisplay = ({ user , clickedUser }) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    const getUsersMessages = async () => {
     try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId}
            })
         setUsersMessages(response.data)
        } catch (error) {
         console.log(error)
     }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId , correspondingUserId: userId}
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
        <div className="chat-name"><p>Your barks with {clickedUser.first_name}:</p></div>
        <Chat descendingOrderMessages={descendingOrderMessages} user={user}/>
     <ChatInput
         user={user}
         clickedUser={clickedUser} getUserMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages}/>
        </>
    )
}

export default ChatDisplay










// import Chat from '../components/Chat'
// import ChatInput from '../components/ChatInput'

// const ChatDisplay = () => {
//     return (
//         <>
//     <Chat/>
//     <ChatInput/>
//     </>
//     )
// }

// export default ChatDisplay;