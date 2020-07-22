import React from 'react'
import styles from './NavigationItem.module.css'

const navigationItem = (props) => {
	let yo = null
	if (props.active) {
		yo = (
			<span>
				<a href={props.link}>{props.children}</a>
			</span>
		)
	} else {
		yo = <a href={props.link}>{props.children}</a>
	}
	return <li className={styles.NavigationItem}>{yo}</li>
}

export default navigationItem
