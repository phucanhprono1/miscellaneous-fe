import { jwtDecode } from 'jwt-decode'

export function saveAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
}

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function removeAccessToken() {
    localStorage.removeItem('accessToken');
}

export function isAccessTokenExpired() {
    const accessToken = getAccessToken();
    if (accessToken) {
        try {
            const decodedToken: any = jwtDecode(accessToken);
            if (decodedToken && decodedToken.payload && decodedToken.payload.exp) {
                const expirationTime = decodedToken.payload.exp * 1000; // Convert to milliseconds
                const currentTime = Date.now();
                return currentTime > expirationTime;
            }
        } catch (error) {
            console.error('Error decoding or verifying the access token:', error);
        }
    }
    return true; // Default to considering the token expired if decoding fails
}