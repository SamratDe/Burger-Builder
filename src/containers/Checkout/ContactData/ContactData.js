import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				edited: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street Address',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				edited: false,
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
				},
				valid: false,
				edited: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				edited: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-mail',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				edited: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: '',
				validation: {},
				valid: true,
			},
		},
		isValid: false,
		loading: false,
	}

	checkValidity = (value, rules) => {
		let isValid = true
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}
		return isValid
	}

	orderHandler = (event) => {
		event.preventDefault()
		this.setState({
			loading: true,
		})
		const formData = {}
		for (let formElement in this.state.orderForm) {
			formData[formElement] = this.state.orderForm[formElement].value
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
		}
		axios
			.post('/orders.json', order)
			.then((res) => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch((err) => {
				this.setState({ loading: false })
			})
	}

	inputChangedHandler = (event, inputIndentifier) => {
		const updatedForm = {
			...this.state.orderForm,
		}
		const updatedFormElement = {
			...updatedForm[inputIndentifier],
		}
		updatedFormElement.value = event.target.value
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		)
		updatedFormElement.edited = true
		updatedForm[inputIndentifier] = updatedFormElement

		let formIsValid = true
		for (let inputIndentifier in updatedForm) {
			formIsValid = updatedForm[inputIndentifier].valid && formIsValid
		}

		this.setState({ orderForm: updatedForm, isValid: formIsValid })
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((ele) => (
					<Input
						key={ele.id}
						elementType={ele.config.elementType}
						elementConfig={ele.config.elementConfig}
						value={ele.config.value}
						invalid={!ele.config.valid}
						shouldValidate={ele.config.validation}
						edited={ele.config.edited}
						change={(event) =>
							this.inputChangedHandler(event, ele.id)
						}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.isValid}>
					ORDER
				</Button>
			</form>
		)
		if (this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className={styles.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

export default connect(mapStateToProps)(ContactData)
