import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

const app = (props) => {
	return (
		<div>
			<Layout>
				<Switch>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' exact component={Orders} />
					<Route path='/' exact component={BurgerBuilder} />
				</Switch>
			</Layout>
		</div>
	)
}

export default app
