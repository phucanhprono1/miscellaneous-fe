import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MusicPlayer: React.FC = () => {
    const [songUrl, setSongUrl] = useState<string | null>(null);
    const url = `${process.env.REACT_APP_API_URL}/stream`;
    useEffect(() => {
        // Gọi API để lấy thông tin bài hát với id=1
        axios.get(url+"/3", { 
            responseType: 'blob',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken'),
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