import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Player from './components/Player/Player';
import MainPage from './components/MainPage/MainPage';
import DownloadPage from './components/DownloadPage/DownloadPage';

function App() {
	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<MainPage />} />

				<Route path='/download' element={<DownloadPage />} />

				<Route path='/player' element={<Player />} />
			</Routes>
		</div>
	);
}

export default App;
