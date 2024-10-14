'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// shadcn ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
    messages: string;
}

interface WebSocketFileProps {
    room: string;
    chatId: string;
}

const WebSocketFile: React.FC<WebSocketFileProps> = ({ room, chatId }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const test_sockRef = useRef<WebSocket>(null!);

    useEffect(() => {
        // Generate a chatId if not present
        // const newChatId = 'feed';

        const user_feed = room;

        if (user_feed) {
            console.log('chartID is:', room);
            // Initialize WebSocket with generated chatId
            test_sockRef.current = new WebSocket(
                `ws://localhost:8000/ws/feedback/${user_feed}/`,
            );

            test_sockRef.current.onopen = () => {
                console.log('Connected to WebSocket server');
                // test_sockRef.current?.send(
                //     JSON.stringify({ message: 'Hello Server!' }),
                // );
            };

            // Event listener for receiving messages from the server
            test_sockRef.current.onmessage = e => {
                const data = JSON.parse(e.data);

                if (data && data.message) {
                    console.log(data);
                    const message = data.message; // Ensure this is a string
                    setMessages(prevMessages => [...prevMessages, message]);
                } else {
                    console.error('Received invalid message:', data);
                }
            };

            // // Event listener for when the connection is closed
            test_sockRef.current.onclose = () => {
                console.log('Disconnected from WebSocket server');
            };

            // // Event listener for errors
            test_sockRef.current.onerror = error => {
                console.error(`WebSocket error: ${error.message}`);
            };

            return () => {
                if (test_sockRef.current) {
                    test_sockRef.current.close();
                }
            };
        }
    }, [chatId]);

    const sendMessage = () => {
        if (test_sockRef.current?.readyState === WebSocket.OPEN) {
            test_sockRef.current.send(JSON.stringify({ message: input }));
            setInput(''); // Clear input after sending
        } else {
            console.error('WebSocket connection is not open.');
        }
    };

    return (
        <div>
            <h1 className="text-center text-2xl">Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>

            <div className="flex justify-center flex-col">
                <div className="m-10 w-[500px]">
                    <Input
                        placeholder="text"
                        className="m-8"
                        type="text"
                        name="message"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>
                <Button onClick={sendMessage} className="w-60">
                    {' '}
                    Send{' '}
                </Button>
            </div>
        </div>
    );
};

export default WebSocketFile;
