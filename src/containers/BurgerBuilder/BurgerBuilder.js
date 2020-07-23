import React, { Component } from 'react'
import { connect } from 'react-redux'

import Hoc from '../../hoc/hoc/hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios'
import * as actionTypes from '../../store/action'

class BurgerBuilder extends Component {
	constructor(props) {
		super(props)
		this.state = {
			purchasing: false, // to activate order summary
			loading: false,
			error: false,
		}
	}

	componentDidMount() {
		// const url = '/ingredients.json'
		// axios
		// 	.get(url)
		// 	.then((res) => {
		// 		const { bacon, cheese, meat, salad } = res.data
		// 		const ingredients = {
		// 			salad,
		// 			meat,
		// 			cheese,
		// 			bacon,
		// 		}
		// 		this.setState({ ingredients })
		// 	})
		// 	.catch((err) => {
		// 		this.setState({ error: true })
		// 	})
	}

	updatePurchaseable = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((ele) => {
				return ingredients[ele]
			})
			.reduce((yo, ele) => {
				return yo + ele
			}, 0)
		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = {
			...this.props.ings,
		}
		for (let i in disabledInfo) {
			disabledInfo[i] = disabledInfo[i] <= 0
		}

		let orderSummary = null
		let burger = this.state.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		)
		if (this.props.ings) {
			burger = (
				<Hoc>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientsAdded={this.props.onIngredientAdded}
						ingredientsRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						ordered={this.purchaseHandler}
						purchaseable={this.updatePurchaseable(this.props.ings)}
					/>
				</Hoc>
			)
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancel={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					totalPrice={this.props.price}
				/>
			)
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Hoc>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Hoc>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
