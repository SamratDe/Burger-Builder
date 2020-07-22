import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.module.css'

const burger = (props) => {
	// structure is [ [,] , [,] , [,] ]
	let ingredientArray = Object.keys(props.ingredients)
		.map((ele) => {
			return [...Array(props.ingredients[ele])].map((_, index) => {
				return <BurgerIngredient key={ele + index} type={ele} />
			})
		})
		.reduce((arr, ele) => {
			return arr.concat(ele)
		}, [])

	if (ingredientArray.length === 0) {
		ingredientArray = <p>Please add ingredients!</p>
	}

	return (
		<div className={styles.Burger}>
			<BurgerIngredient type='bread-top' />
			{ingredientArray}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default burger
