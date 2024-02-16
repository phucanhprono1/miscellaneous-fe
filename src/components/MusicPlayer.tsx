import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../auth/auth';
interface MusicPlayerProps {
    id: string | number;
}

function MusicPlayer  ({id}: MusicPlayerProps) {
    const [songUrl, setSongUrl] = useState<string | null>(null);
    const url = `${process.env.REACT_APP_API_URL}/stream/1`;

    useEffect(() => {
        // Gọi API để lấy thông tin bài hát với id=3
        axios.get(url, { 
            responseType: 'blob',
            headers: {
                "Authorization": "Bearer " + getAccessToken(),
            }
         })
            .then(response => {
                // Tạo URL cho file nhạc
                const blob = new Blob([response.data], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                setSongUrl(url);
            })
            .catch(error => {
                console.error('Error fetching song:', error);
            });
    }, []);

    return (
        <div>
            <h1>Music Player</h1>
            {songUrl && (
                <audio controls>
                    <source src={songUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};
export default MusicPlayer;