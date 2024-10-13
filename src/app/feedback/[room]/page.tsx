'use client';

import { useParams } from 'next/navigation';
import WebSocketFile from '@/components/websockets';
import MessagesPrint from '@/components/messages';

const FeedbackPage = () => {
    const params = useParams();
    const room = params.room;

    return (
        <div>
            <h1 className="text-center mt-5">Feedback for Room: {room}</h1>
            {/* Add your feedback content here */}
            <WebSocketFile room={room} />
        </div>
    );
};

export default FeedbackPage;
