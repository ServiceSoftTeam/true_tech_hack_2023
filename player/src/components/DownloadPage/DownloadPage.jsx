import React, { useState } from 'react';
import styles from './DownloadPage.module.scss';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {uploadFile} from '../../actions/file.js';

const DownloadPage = () => {
	const [dragEnter, setDragEnter] = useState(false);

	const fileUploadHandler = (event) => {
		//Получаем все файлы из инпута
		const file = [...event.target.files];
		console.log(file);
		//Для каждого из файла вызовем функцию загрузки
		// files.forEach(file => dispatch(uploadFile(file, currentDir)))
	};

	const dragEnterHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(true);
	};

	const dragLeaveHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(false);
	};

	//Получаем перенесенные в область файлы
	const dropHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		let file = [...event.dataTransfer.files];
		console.log(file);
		//Для каждого из файла вызовем функцию загрузки
		// files.forEach((file) => dispatch(uploadFile(file, currentDir)));
		setDragEnter(false);
	};

	return (
		<div className={styles.container}>
			<NavLink className={styles.back} to="/">
				<ArrowBackIcon />
				<div className={styles.text}>Вернуться назад</div>
			</NavLink>

			<div className={styles.base}>
				<div className={styles.head}>Выберите и перетащите файл</div>

				<div className={styles.download}>
					{!dragEnter ? (
						<>
							<label>Загрузить файл</label>
							<input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" />
						</>
					) : (
						<div
							className="drop-area"
							onDrop={dropHandler}
							onDragEnter={dragEnterHandler}
							onDragLeave={dragLeaveHandler}
							onDragOver={dragEnterHandler}
						>
							Перетащите файлы сюда
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DownloadPage;
