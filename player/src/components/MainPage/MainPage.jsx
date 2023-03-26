import React from 'react';
import styles from './MainPage.module.scss';
import { NavLink } from 'react-router-dom';

const MainPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Аудиосопровождение происходящего на экране
				<p>для людей с нарушением зрени</p>
			</div>

			<div className={styles.selected}>
				<NavLink className={styles.item} to="/player">
                    Тестовый демо-ролик
				</NavLink>
                <NavLink className={styles.item} to="/download">
                    Загрузить свой ролик
				</NavLink>
			</div>
		</div>
	);
};

export default MainPage;
