import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../auth/auth';
import { useParams } from 'react-router-dom';

function MusicPlayer() {
    const [songUrl, setSongUrl] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>(); // Trích xuất id từ URL

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/stream/${id}`;

        // Gọi API để lấy thông tin bài hát với id từ URL
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
    }, [id]); // Thêm id vào dependency array để gọi useEffect khi id thay đổi

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
}

export default MusicPlayer;