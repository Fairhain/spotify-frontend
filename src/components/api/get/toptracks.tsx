// UserPlaylists.tsx
import React, { useEffect, useState } from 'react';

const TopTracks: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken) {
      fetchTopArtists(accessToken);
    }
  }, [accessToken]);

  const fetchTopArtists= async (token: string) => {
    const url = 'https://api.spotify.com/v1/me/top/tracks';

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTracks(data.items);
      } else {
        console.error('Failed to fetch tracks');
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div>
      <h1>Top Artists</h1>
      {tracks.length > 0 ? (
        <ol>
          {tracks.map((item) => (
            <li key={item.id}>{item.name} by 
                <ul>
                    {item.artists.map((artist: {
                        id: string | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
}) => (
                        <div key={artist.id}>{artist.name}</div>
                    ))}
                </ul>
            </li>

          ))}
        </ol>
      ) : (
        <p>No tracks found</p>
      )}
    </div>
  );
};

export default TopTracks;
