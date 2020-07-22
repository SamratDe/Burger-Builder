import React from 'react'
import styles from './Button.module.css'
import Hoc from '../../../hoc/hoc/hoc'

const button = (props) => {
	return (
		<Hoc>
			<button
				className={[styles.Button, styles[props.btnType]].join(' ')}
				onClick={props.click}
				disabled={props.disabled}
			>
				{props.children}
			</button>
		</Hoc>
	)
}

export default button
