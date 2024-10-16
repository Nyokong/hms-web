'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Messagesprint from '@/components/messages';
import useAuth from '../api/useAuth';

const FeedbackPage = () => {
    const params = useParams();
    const roomId = params.id;
    const [rooms, setRooms] = useState([]);

    const { user, error } = useAuth();

    // useEffect(() => {
    //     const fetchRooms = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:8000/api/feedback/rooms/${roomId}`,
    //             );
    //             setRooms(response.data);
    //         } catch (error) {
    //             console.error('Error fetching rooms:', error);
    //         }
    //     };

    //     fetchRooms();
    // }, [roomId]);

    if (user) {
        return (
            <div className="container mx-auto mt-5">
                <Messagesprint id={user.id} />
                {/* <h1 className="text-center">Feedback for Room: {roomId}</h1>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map(room => (
                        <Card key={room.id} className="shadow-lg">
                            <CardHeader>
                                <CardTitle>{room.id}</CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    ))}
                </div> */}
            </div>
        );
    }
};

export default FeedbackPage;
