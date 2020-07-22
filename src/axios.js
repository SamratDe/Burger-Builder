import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://burger-builder-project-b96b1.firebaseio.com/',
})

export default instance
