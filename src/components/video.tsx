import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
    videoSrc: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ videoSrc }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [quality, setQuality] = useState<string>('720p');
    const [hls, setHls] = useState<Hls | null>(null);

    useEffect(() => {
        if (videoRef.current && isPlaying) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setIsLoading(false);
                    videoRef.current?.play();
                });
                hls.on(Hls.Events.BUFFER_APPENDING, () => {
                    setIsLoading(true);
                });
                hls.on(Hls.Events.BUFFER_APPENDED, () => {
                    setIsLoading(false);
                });
                hls.on(Hls.Events.ERROR, (_, data) => {
                    if (
                        data.fatal &&
                        data.type === Hls.ErrorTypes.NETWORK_ERROR
                    ) {
                        console.error(
                            'Fatal network error encountered, trying to recover...',
                        );
                        hls.startLoad();
                    }
                });
            } else if (
                videoRef.current.canPlayType('application/vnd.apple.mpegurl')
            ) {
                videoRef.current.src = videoSrc;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current?.play();
                });
            }
        }
    }, [videoSrc, isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    if (!isPlaying) {
        handlePlay();
        // return <button onClick={handlePlay}>Play</button>;
    }

    return (
        <div className="h-auto w-auto container flex justify-center items-center lg:w-[680px] bg-black ">
            <video
                className="h-[280px] w-[640px] "
                ref={videoRef}
                width="640"
                height="280"
                controls
            />
        </div>
    );
};

export default HlsPlayer;
