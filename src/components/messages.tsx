import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Message {
    message: string;
}

const MessagesPrint: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    // const router = useRouter();
    // const { roomId } = router.query;
    const roomID = 1;
    const [initialMessages, setInitialMessages] = useState([]);

    useEffect(() => {
        // Fetch messages from the API
        axios
            .get(`http://localhost:8000/api/feedback//rooms`)
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setMessages(response.data);
                    console.log(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            {messages.map((message, index) => (
                <ul key={index}>
                    <li>{message.sender}</li>
                    <li>{message.message}</li>
                </ul>
            ))}
        </div>
    );
};

export default MessagesPrint;
