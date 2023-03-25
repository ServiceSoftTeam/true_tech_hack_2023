import React, {useState, useRef} from "react";
import styles from './Player.module.scss';
import ReactPlayer from "react-player";
import video from "../../assets/sample-30s.mp4";

const Player = () => {
    const playerRef = useRef(null);
	const [isPlaying, setPlaying] = useState(false);
	const [isMuted, setMuted] = useState(false);
	const [volume, setVolume] = useState(0);
	// const [isSeek, setSeek] = useState(false);
	// const [played, setPlayed] = useState(0);

    return (
        <div className={styles.base}>
            <ReactPlayer
                width={'100%'}
                height={'100%'}
                // className={styles.video}
                ref={playerRef}
                playing={isPlaying}
                muted={isMuted}
                url={video}
                volume={volume}
                // seeking={isSeek ? isSeek : undefined}
                // onProgress={!isSeek && handleProgress}
                // onDuration={handleTime}
		    />
        </div>
    );
};

export default Player;