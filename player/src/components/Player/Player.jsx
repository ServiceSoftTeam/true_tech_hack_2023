import React, { useState, useRef } from 'react';
import styles from './Player.module.scss';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import Controls from './Controls/Controls';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import soundPlay from '../../assets/sample-12s.mp3';
import video from '../../assets/sample-30s.mp4';

const Format = (seconds) => {
	if (isNaN(seconds)) return '00:00:00';

	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours().toString().padStart(2, '0');
	const mm = date.getUTCMinutes().toString().padStart(2, '0');
	const ss = date.getUTCSeconds().toString().padStart(2, '0');

	const min = hh ? mm.toString().padStart(2, '0') : mm;
	return `${hh}:${min}:${ss}`;
};

const Player = () => {
	const playerRef = useRef(null);
	const [isPlaying, setPlaying] = useState(false);
	const [isMuted, setMuted] = useState(false);
	const [volume, setVolume] = useState(0);
	const [isShowControls, setShowControls] = useState(false);
	const [isSeek, setSeek] = useState(false);
	const [played, setPlayed] = useState(0);
	const [duration, setDuration] = useState(0);

	const openControls = () => {
		setShowControls(true);
	};

	const closeControls = () => {
		setShowControls(false);
	};

	const handlePlayPause = (type) => {
		if(type === 'play'){
			setPlaying(true);
		}
		if(type === 'pause'){
			setPlaying(false);
		}
	};

	const handleVolumeChange = (e, value) => {
		setVolume(value / 100);
		setMuted(!value);
	};

	const handleMute = () => {
		setMuted(!isMuted);
	};

	const handleVolumeSeekDown = (e, value) => {
		setSeek(false);
		setVolume(value / 100);
	};

	const handleProgress = (change) => {
		// if (!isSeek) {
		setPlayed(change.played);
		// }
	};

	const handleTime = (time) => {
		setDuration(time);
	};

	const handleSeekChange = (e, value) => {
		setPlayed(value / 100);
	};

	const handleSeekMouseUp = (e, value) => {
		setSeek(false);
		playerRef.current.seekTo(value / 100, 'fraction');
	};

	const handleSeekMouseDown = () => {
		setSeek(true);
	};

	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
	};

	const handleFastForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
	};

	const elapsedTime = Format(playerRef && playerRef.current ? playerRef.current.getCurrentTime() : '00:00');

	const durationTime = Format(duration ? duration : '00:00');

	return (
		<div className={styles.container}>
			<NavLink className={styles.back} to='/'>
				<ArrowBackIcon />
				<div className={styles.text}>Вернуться назад</div>
			</NavLink>

			<div onMouseEnter={openControls} onMouseLeave={closeControls} className={styles.base}>
				<div className={styles.head}>Побег из Шоушенка</div>

				<ReactAudioPlayer
					src={soundPlay}
					// autoPlay
					controls
					// onClick={}
					onPlay={(e) => handlePlayPause(e.type)}
					onPause={(e) => handlePlayPause(e.type)}
				/>

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
					onProgress={!isSeek && handleProgress}
					onDuration={handleTime}
				/>

				{isShowControls && (
					<Controls
						playing={isPlaying}
						played={played}
						isMuted={isMuted}
						volume={volume}
						duration={durationTime}
						elapsedTime={elapsedTime}
						onRewind={handleRewind}
						onFastForward={handleFastForward}
						// onPlayPause={handlePlayPause}
						onVolumeChange={handleVolumeChange}
						onMute={handleMute}
						onVolumeSeekDown={handleVolumeSeekDown}
						onSeek={handleSeekChange}
						onSeekMouseDown={handleSeekMouseDown}
						onSeekMouseUp={handleSeekMouseUp}
					/>
				)}
			</div>
		</div>
	);
};

export default Player;
