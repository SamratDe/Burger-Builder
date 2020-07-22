import React from 'react'
import Hoc from '../../../hoc/hoc/hoc'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
	const ingredients = Object.keys(props.ingredients).map((ele) => {
		return (
			<li key={ele}>
				<span style={{ textTransform: 'capitalize' }}>{ele}</span>:{' '}
				{props.ingredients[ele]}
			</li>
		)
	})

	return (
		<Hoc>
			<h3>Your Order</h3>
			<p>A delicious Burger with the following ingredients:</p>
			<ul>{ingredients}</ul>
			<p>
				<strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
			</p>
			<p>Continue to Checkout ?</p>
			<Button click={props.purchaseCancel} btnType={'Danger'}>
				CANCEL
			</Button>
			<Button click={props.purchaseContinue} btnType={'Success'}>
				CONTINUE
			</Button>
		</Hoc>
	)
}

export default orderSummary
