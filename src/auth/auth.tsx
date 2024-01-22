export function saveAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
}

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function removeAccessToken() {
    localStorage.removeItem('accessToken');
}