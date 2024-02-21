import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { getAccessToken } from '../auth/auth';
import { useParams } from 'react-router-dom';

function MusicPlayer() {
    const [songUrl, setSongUrl] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>(); // Trích xuất id từ URL

    useEffect(() => {
        const fetchSong = async () => {
            const url = `${process.env.REACT_APP_API_URL}/stream/${id}`;

            try {
                const response = await axios.get(url, {
                    responseType: 'blob',
                    headers: {
                        "Authorization": "Bearer " + getAccessToken(),
                    }
                });
                const blob = new Blob([response.data], { type: 'application/octet-stream' });
                const songUrl = URL.createObjectURL(blob);
                setSongUrl(songUrl);
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        };

        fetchSong();
    }, [id]);

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