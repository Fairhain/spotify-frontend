import React, { useState, useEffect } from 'react';
import './play.css'

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback() {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
    const [current_track, setTrack] = useState(track);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = accessToken;
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb) => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);
            player.addListener('ready', ({ device_id }: {device_id: string}) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }:{device_id: string}) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state) return;

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then((state) => {
                    (!state) ? setActive(false) : setActive(true);
                });
            });

            player.connect().then(success => {
                if (success) {
                  console.log('The Web Playback SDK successfully connected to Spotify!');
                }
              })        };
    }, []);

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>
                        </div>
                        <div className='play-buttons'>
                            <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
                                &lt;&lt;
                            </button>

                            <button className="btn-spotify" onClick={() => { player?.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                            <button className="btn-spotify" onClick={() => { player?.nextTrack() }} >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback