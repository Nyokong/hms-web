import { useEffect, useState } from 'react';
import axios from 'axios';

interface Video {
    id: number;
    title: string;
    description: string;
    cmp_video: string;
    hls_name: string;
    hls_path: string | null;
    is_running: boolean;
    status: string;
    thumbnail: string | null;
    assignment: number;
}

interface VideoState {
    videodata: Video[] | null;
    notfound: boolean;
    found: boolean;
    loading: boolean;
    error: string | null;
}

const useVideoData = () => {
    const [videoState, setVideoState] = useState<VideoState>({
        videodata: null,
        notfound: false,
        found: true,
        loading: true,
        error: null,
    });

    const fetchVideoData = async () => {
        // Retrieving data
        // const videoData = localStorage.getItem('videos_data');

        // if (videoData) {
        //     setVideoState({
        //         videodata: JSON.parse(videoData),
        //         notfound: false,
        //         found: true,
        //         loading: false,
        //         error: null,
        //     });
        //     return;
        // }

        try {
            const response = await axios.get<Video[]>(
                'http://localhost:8000/api/vd/view',
            );
            if (response.data && response.data.length > 0) {
                setVideoState({
                    videodata: response.data,
                    notfound: false,
                    found: true,
                    loading: false,
                    error: null,
                });

                // set localstorage data
                // localStorage.setItem(
                //     'videos_data',
                //     JSON.stringify(response.data),
                // );
            } else {
                setVideoState({
                    videodata: null,
                    notfound: true,
                    found: false,
                    loading: false,
                    error: 'Video not found',
                });
            }
        } catch (error: any) {
            setVideoState({
                videodata: null,
                notfound: true,
                found: false,
                loading: false,
                error: error.message || 'Error fetching video data',
            });
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, []);

    return videoState;
};

export default useVideoData;
