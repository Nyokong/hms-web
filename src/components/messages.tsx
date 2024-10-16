import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Message {
    sender: string;
    message: string;
}

const MessagesPrint: React.FC<{ id: number }> = ({ id }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/feedback/messages/${id}`,
                );
                if (response.data && Array.isArray(response.data)) {
                    setMessages(response.data);
                    console.log(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMessages();
    }, [id]);

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-center">Messages</h1>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages.map((message, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{message.sender}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{message.message}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MessagesPrint;
