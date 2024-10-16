'use client';

import { useParams } from 'next/navigation';
import WebSocketFile from '@/components/websockets';
import MessagesPrint from '@/components/messages';
import useAuth from '@/app/api/useAuth';
import Messagesprint from '@/components/messages';

const FeedbackPage = () => {
    const params = useParams();
    const room = params.room;

    const { user, error } = useAuth();

    if (user) {
        return (
            <div>
                <Messagesprint id={user.id} />
                <h1 className="text-center mt-5">Feedback for Room: {room}</h1>
                {/* Add your feedback content here */}
                <WebSocketFile room={room} />
            </div>
        );
    }
};

export default FeedbackPage;
