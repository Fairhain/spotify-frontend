// UserPlaylists.tsx
import React, { useEffect, useState } from 'react';

const TopArtists: React.FC = () => {
  const [artist, setArtists] = useState<any[]>([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken) {
      fetchTopArtists(accessToken);
    }
  }, [accessToken]);

  const fetchTopArtists= async (token: string) => {
    const url = 'https://api.spotify.com/v1/me/top/artists';

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArtists(data.items);
      } else {
        console.error('Failed to fetch artists');
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  return (
    <div>
      <h1>Top Artists</h1>
      {artist.length > 0 ? (
        <ol>
          {artist.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ol>
      ) : (
        <p>No artists found</p>
      )}
    </div>
  );
};

export default TopArtists;
