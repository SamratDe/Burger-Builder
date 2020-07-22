import React, { Component } from 'react'
import Hoc from '../../hoc/hoc/hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ingredients: null,
			totalPrice: 4,
			purchaseable: false, // to activate order now button
			purchasing: false, // to activate order summary
			loading: false,
			error: false,
		}
	}

	componentDidMount() {
		const url = '/ingredients.json'
		axios
			.get(url)
			.then((res) => {
				const { bacon, cheese, meat, salad } = res.data
				const ingredients = {
					salad,
					meat,
					cheese,
					bacon,
				}
				this.setState({ ingredients })
			})
			.catch((err) => {
				this.setState({ error: true })
			})
	}

	updatePurchaseable = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((ele) => {
				return ingredients[ele]
			})
			.reduce((yo, ele) => {
				return yo + ele
			}, 0)
		this.setState({ purchaseable: sum > 0 })
	}

	addIngredientHandler = (type) => {
		const updatedCount = this.state.ingredients[type] + 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCount
		const priceAddition = INGREDIENT_PRICES[type]
		const newPrice = this.state.totalPrice + priceAddition
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice,
		})
		this.updatePurchaseable(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const updatedCount = this.state.ingredients[type] - 1
		if (updatedCount < 0) return
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCount
		const priceDeduction = INGREDIENT_PRICES[type]
		const newPrice = this.state.totalPrice - priceDeduction
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice,
		})
		this.updatePurchaseable(updatedIngredients)
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		const queryParams = []
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					'=' +
					encodeURIComponent(this.state.ingredients[i])
			)
		}
		queryParams.push('price=' + this.state.totalPrice)
		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients,
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
		if (this.state.ingredients) {
			burger = (
				<Hoc>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientsAdded={this.addIngredientHandler}
						ingredientsRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						ordered={this.purchaseHandler}
						purchaseable={this.state.purchaseable}
					/>
				</Hoc>
			)
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancel={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)
