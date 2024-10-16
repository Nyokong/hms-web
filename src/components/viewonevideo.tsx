'use client';

import React, { useState } from 'react';
import HlsPlayer from './video';

export default function viewonevideo({ id }: any) {
    const [quality, setQuality] = useState<string>('360p');

    console.log(id);

    return (
        <div>
            <HlsPlayer
                videoSrc={`http://127.0.0.1:8000/api/vd/stream/${id}/${quality}.m3u8`}
            />
        </div>
    );
}
