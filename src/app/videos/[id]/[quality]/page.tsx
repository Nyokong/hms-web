'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';

import useNetworkStatus from '@/app/api/networktest';

import HlsPlayer from '@/components/video';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';
import { sources } from 'next/dist/compiled/webpack/webpack';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

export default function VideoPage() {
    const { id } = useParams();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // const [qualit, setQuality] = useState<any>(null);
    // const [videoBlob, setVideoBlob] = useState<any>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    const connectionType = useNetworkStatus();
    const [connectionSpeed, setConnectionSpeed] = useState(null);
    const [quality, setQuality] = useState<string>('360p');

    const loggedin = getCookie('user_data');
    const userid = JSON.parse(loggedin);

    useEffect(() => {
        if (connectionType) {
            switch (connectionType) {
                case '4g':
                    setQuality('720p');
                    break;
                case '3g':
                    setQuality('480p');
                    break;
                case '2g':
                    setQuality('360p');
                    break;
                case 'slow-2g':
                    setQuality('144p');
                    break;
                default:
                    setQuality('360p');
            }
        }
        console.log(connectionType);
    }, [connectionType]);

    return (
        <div className="container flex flex-col mt-4">
            {/* <video width="320" height="240" controls>
                <source
                    src={`http://127.0.0.1:8000/api/vd/view/${id}`}
                    type="video/mp4"
                />
            </video> */}

            <Link className="text-white" href={`dashboard/${userid.id}/`}>
                {' '}
                back
            </Link>

            <HlsPlayer
                videoSrc={`http://127.0.0.1:8000/api/vd/stream/${id}/${quality}.m3u8`}
            />

            <div>
                <label htmlFor="quality">Select Quality: </label>
                <select
                    id="quality"
                    value={quality}
                    // onChange={handleQualityChange}
                >
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                    <option value="144p">144p</option>
                </select>
            </div>
            {/* <HlsPlayer
                videoSrc={`http://127.0.0.1:8000/api/vd/masterstream/${id}.m3u8`}
            /> */}
        </div>
    );
}
