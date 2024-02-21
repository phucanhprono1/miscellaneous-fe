import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {jwtDecode} from 'jwt-decode';

function FileUpload(){
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    useEffect(() => {


        if (!accessToken) {
            // Redirect to login page or handle unauthorized access
            navigate("/login");
        }
        else {
            try {
                const decodedToken: any = jwtDecode(accessToken);
                const expirationTime = decodedToken.payload.exp * 1000;
                if (Date.now() >= expirationTime) {
                    navigate('/login');
                }
            }
            catch (e) {
                navigate('/upload');
            }
        }
        // ... Perform any other operations with the JWT token
    }, [accessToken,navigate]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArtist(event.target.value);
    };
    const uploadUrl = `${process.env.REACT_APP_API_URL}/upload`;
    const handleUpload = async () => {
        try {

            const formData = new FormData();
            formData.append('file', file as Blob);
            formData.append('title', title);
            formData.append('artist', artist);

            await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error('Error uploading file:', error);
            })
        } catch (error) {
            // Handle errors
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload Song</h2>
            <div className="">
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div>
                <label>Artist:</label>
                <input type="text" value={artist} onChange={handleArtistChange} />
            </div>
            <div>
                <label>Choose File:</label>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default FileUpload;