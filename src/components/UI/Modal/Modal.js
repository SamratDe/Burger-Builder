import React, { Component } from 'react'
import styles from './Modal.module.css'
import Hoc from '../../../hoc/hoc/hoc'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		)
	}

	render() {
		return (
			<Hoc>
				<Backdrop
					show={this.props.show}
					click={this.props.modalClosed}
				/>
				<div
					className={styles.Modal}
					style={{
						transform: this.props.show
							? 'translateY(0)'
							: 'translate(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</Hoc>
		)
	}
}

export default Modal
