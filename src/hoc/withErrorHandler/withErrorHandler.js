import React, { Component } from 'react'
import Hoc from '../hoc/hoc'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {
				error: null,
			}
		}

		// try without componentWillMount - it is deprecated!!!
		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use((req) => {
				this.setState({
					error: null,
				})
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({
						error,
					})
				}
			)
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)
		}

		errorHandler = () => {
			this.setState({
				error: null,
			})
		}

		render() {
			return (
				<Hoc>
					<Modal
						show={this.state.error}
						modalClosed={this.errorHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Hoc>
			)
		}
	}
}

export default withErrorHandler
