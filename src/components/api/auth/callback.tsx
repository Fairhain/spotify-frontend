import {useEffect} from "react";
import { useSearchParams } from "react-router-dom";

const Callback: React.FC = () => {
    const [searchParams] = useSearchParams();
  
    useEffect(() => {
      const code = searchParams.get('code');
      if (code) {
        console.log('HI');
        getAccessToken(code); // Call the backend to exchange the code for tokens
      } else {
        console.error('Authorization code not found in URL');
      }
    }, [searchParams]);
  
    const getAccessToken = async (code: string) => {
      try {
        const response = await fetch(`http://localhost:3000/getAccessToken?code=${code}`);
        
        if (response.ok) {
          const tokenData = await response.json();
          const { access_token, refresh_token, expires_in } = tokenData;
  
          // Store tokens in localStorage
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
  
          // Log tokens only after storing them
          console.log('Access Token:', access_token);
          console.log('Refresh Token:', refresh_token);
          window.location.href = 'http://localhost:5173/';

        } else {
          console.error('Failed to exchange token:', await response.text());
        }
      } catch (error) {
        console.error('Error during token exchange:', error);
      }
    };
    return (
      <div>
        <h1>Redirected from Spotify</h1>
        <p>Handling the authorization code...</p>
      </div>
    );
  };
  
  export default Callback;
  