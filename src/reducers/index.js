import { combineReducers } from 'redux';
import { SELECT_SUBREDDIT, RECEIVE_POSTS } from '../actions';

const selectedSubreddit = (state = 'banner', action) => {
	switch (action.type) {
		case SELECT_SUBREDDIT:
			return action.subreddit
		default:
			return state
	}
}

const posts = (state = { items: [] }, action) => {
	switch (action.type) {
		case RECEIVE_POSTS:
			return {
				...state,
				items: action.posts,
				totalItemLength: action.totalItemLength
			}
		default:
			return state;
	}
}

const postsBySubreddit = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_POSTS:
			return {
				...state,
				[action.subreddit]: posts(state[action.subreddit], action)
			}
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	postsBySubreddit,
	selectedSubreddit
})

export default rootReducer;
