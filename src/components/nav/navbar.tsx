import React from 'react';
import './navbar.css'

const CLIENT_ID = 'cc0d6b182b0c47828f0fae661633ba7d';
const REDIRECT_URI = 'http://localhost:5173/callback'; // Replace with your redirect URI
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';
const SCOPES = 'streaming user-read-private user-read-email playlist-read-private user-top-read';

const pages = [
    {name: 'Home', path: '/'},
    {name: 'Playlists', path: '/playlists'},
    {name: 'Artists', path: '/artists'},
    {name: 'Tracks', path: '/tracks'},
    {name: 'Web Player', path: '/player'}
]

const NavBar: React.FC = () => {
    const handleLogin = () => {
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
        window.location.href = authUrl; // Redirect to Spotify authorization page
      };

    const changePage = (path: string) => {
        const page = `http://localhost:5173${path}`
        window.location.href = page;
    };
    
    return (
        <div className='nav-bar'>
            <a className="login-button" onClick={handleLogin}>
                Login with Spotify
            </a>
            <ul className='nav-list'>
                {
                    pages.map((item) => (
                        <a className="list-item" key={item.path}>
                            <span onClick={() => changePage(item.path)}>{item.name}</span>
                        </a>   
                    ))
                }
            </ul>
            
            
        </div>
    );
}
export default NavBar;