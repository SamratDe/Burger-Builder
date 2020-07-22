import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	}

	componentDidMount() {
		axios
			.get('/orders.json')
			.then((res) => {
				const fetchedOrders = []
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key,
					})
				}
				this.setState({ loading: false, orders: fetchedOrders })
				// console.log(this.state.orders)
			})
			.catch((err) => {
				this.setState({ loading: false })
			})
	}

	render() {
		return (
			<div>
				{this.state.orders.map((ele) => (
					<Order
						key={ele.id}
						ingredients={ele.ingredients}
						price={+ele.price}
					/>
				))}
			</div>
		)
	}
}

export default withErrorHandler(Orders, axios)
