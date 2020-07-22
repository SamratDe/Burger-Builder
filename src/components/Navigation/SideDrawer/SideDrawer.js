import React from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Hoc from '../../../hoc/hoc/hoc'

const sideDrawer = (props) => {
	let attachedStyles = [styles.SideDrawer, styles.Close]
	if (props.open) {
		attachedStyles = [styles.SideDrawer, styles.Open]
	}

	return (
		<Hoc>
			<BackDrop show={props.open} click={props.closed} />
			<div className={attachedStyles.join(' ')}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Hoc>
	)
}

export default sideDrawer
