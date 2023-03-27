import React, { useState, useEffect } from 'react';
import { IconButton, Box, Slider, Switch, styled, List, ListItemButton, ClickAwayListener } from '@mui/material';
import { VolumeOff, VolumeUp, Replay10, VolumeDown, Forward10 } from '@mui/icons-material';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import styles from './Controls.module.scss';
// import FullscreenExitSharpIcon from '@mui/icons-material/FullscreenExitSharp';

const TimeSlider = styled(Slider)({
	width: '95%',
	display: 'flex',
	borderRadius: '0px',
	height: '8px',
	color: '#F07C00',
	margin: '0 auto',
	padding: '5px 0',
	marginBottom: '10px',

	'& .MuiSlider-track': {
		border: 'none',
	},

	'& .MuiSlider-rail': {
		color: 'white',
		opacity: '0.5',
	},

	'& .MuiSlider-thumb': {
		color: 'white',
	},
});

const VolumeSlider = styled(Slider)({
	width: '60px',
	transform: 'rotate(270deg)',
	color: '#FF992C',
	height: '12px',

	'& .MuiSlider-rail': {
		color: '#CFCFCF',
		opacity: '0.7',
	},

	'& .MuiSlider-thumb': {
		width: '14px',
		height: '14px',
		color: 'white',
	},
});

const SettingSwitch = styled(Switch)({
	'& .MuiSwitch-thumb': {
		width: '18px',
		height: '18px',
		color: 'white',
		border: '1px solid #ADB5BD',
	},

	'& .MuiSwitch-track': {
		backgroundColor: '#E9ECEF',
		border: '1px solid #ADB5BD',
		'& .checked': {
			color: 'white',
		},
	},

	'& .MuiSwitch-switchBase': {
		'&.Mui-checked': {
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: '#FF992C',
			},
		},
	},
});

const Controls = ({
	playing,
	played,
	onPlayPause,
	isMuted,
	duration,
	onVolumeChange,
	volume,
	onVolumeSeekDown,
	onSeek,
	onSeekMouseDown,
	onSeekMouseUp,
	elapsedTime,
	onRewind,
	onFastForward,
	isModal,
}) => {
	const [isSettings, setSettings] = useState(false);
	const [isVolume, setVolume] = useState(false);
	const [isSmall, setSmall] = useState(false);
	
	const btnStyle = (isActive) => (isActive ? buttons.icons['&:active'] : buttons.icons);

	const handleChangeSettingsView = () => {
		setSettings((prev) => !prev);
	};

	const handleVolume = () => {
		setVolume((prev) => !prev);
	};

	const buttons = {
		icons: {
			fontSize: isModal ? '30px' : '25px',
			color: '#FFFFFF',

			'&:active': {
				color: '#FF992C',
			},

			'&:hover': {
				color: '#FF992C',
			},
		},
		time: {
			display: 'flex',
			alignItems: 'center',
			margin: '8px 0',
			fontSize: isModal ? '25px' : '18px',
			color: 'white',
		},
		iconsTime: {
			fontSize: isModal ? '30px' : '25px',
			color: '#FFFFFF',

			'&:hover': {
				color: '#FF992C',
			},
		},
	};

	const controlIcons = () => {
		return (
			<>
				<IconButton sx={btnStyle(isVolume)} onClick={handleVolume}>
					{isVolume && (
						<div className={styles.sliderVolume}>
							<VolumeSlider
								min={0}
								max={100}
								value={volume * 100}
								onChange={onVolumeChange}
								onChangeCommitted={onVolumeSeekDown}
							/>
						</div>
					)}

					{isMuted ? <VolumeOff /> : volume > 0.5 ? <VolumeUp /> : <VolumeDown />}
				</IconButton>

				<IconButton sx={btnStyle(isSettings)} onClick={handleChangeSettingsView}>
					<SettingsRoundedIcon />
				</IconButton>
			</>
		);
	};

	return (
		<div className={styles.controls}>
			<div className={styles.controlPlay}>
				<div className={styles.timeContrl}>
					<IconButton sx={buttons.iconsTime} onClick={onRewind}>
						<Replay10 />
					</IconButton>
					<IconButton sx={buttons.iconsTime} onClick={onPlayPause}>
						{playing ? <PauseOutlinedIcon /> : <PlayArrowIcon />}
					</IconButton>
					<IconButton sx={buttons.iconsTime} onClick={onFastForward}>
						<Forward10 />
					</IconButton>
					<Box sx={buttons.time}>
						{duration} / {elapsedTime}
					</Box>
				</div>

				{isSettings && (
					<ClickAwayListener onClickAway={handleChangeSettingsView}>
						<div className={styles.settings}>
							
						</div>
					</ClickAwayListener>
				)}

				<div>
					{(!isSmall || isModal) && controlIcons()}

					<IconButton sx={buttons.icons}>
						<FullscreenIcon />
					</IconButton>

					{/* <IconButton sx={buttons.icons} onClick={() => setShowModal(false)}>
						<FullscreenExitSharpIcon />
					</IconButton> */}
				</div>
			</div>

			<TimeSlider
				min={0}
				max={100}
				value={played * 100}
				onChange={onSeek}
				onMouseDown={onSeekMouseDown}
				onChangeCommitted={onSeekMouseUp}
			/>
		</div>
	);
};

export default Controls;
