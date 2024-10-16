// UserPlaylists.tsx
import React, { useEffect, useState } from 'react';

const UserPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken) {
      fetchUserPlaylists(accessToken);
    } 
  }, [accessToken]);

  const fetchUserPlaylists = async (token: string) => {
    const url = 'https://api.spotify.com/v1/me/playlists';

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPlaylists(data.items);
      } else {
        console.error('Failed to fetch playlists');
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  return (
    <div>
      <h1>User Playlists</h1>
      {playlists.length > 0 ? (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id} >{playlist.name}</li>
          ))}
        </ul>
      ) : (
        <p>No playlists found</p>
      )}
    </div>
  );
};

export default UserPlaylists;
