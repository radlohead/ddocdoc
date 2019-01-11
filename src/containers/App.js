import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, fetchUpdatePosts } from '../actions';
import Posts from '../components/Banners';

class App extends Component {
	static propTypes = {
		selectedSubreddit: PropTypes.string.isRequired,
		posts: PropTypes.array.isRequired,
		totalItemLength: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount() {
		const { dispatch, selectedSubreddit } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	handleChange = (nextSubreddit) => {
		this.props.dispatch(selectSubreddit(nextSubreddit));
	}

	onFetchMoreData = () => {
		this.props.dispatch(fetchUpdatePosts('banner', this.props.posts, 20));
	}

	handleRefreshClick = (e) => {
		e.preventDefault();

		const { dispatch, selectedSubreddit } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	render() {
		const { posts, totalItemLength } = this.props;

		return (
			<div>
				<Posts posts={posts}
					onFetchMoreData={this.onFetchMoreData}
					totalItemLength={totalItemLength} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { selectedSubreddit, postsBySubreddit } = state;
	const { totalItemLength, items: posts } = postsBySubreddit[selectedSubreddit] || { items: [] };

	return {
		selectedSubreddit,
		posts,
		totalItemLength
	}
}

export default connect(mapStateToProps)(App);
