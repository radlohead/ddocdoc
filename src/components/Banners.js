import React from 'react';
import PropTypes from 'prop-types';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import './Banners.css';

const Posts = ({ posts, onFetchMoreData, totalItemLength }) => {
	return (
		<InfiniteScroll
			dataLength={posts.length}
			next={onFetchMoreData}
			hasMore={totalItemLength !== posts.length}
			loader={<span>Loading...</span>}
		>
			<ul className="banners">
				{posts.map((v, index) => (
					<li key={index}>
						<a className="banner" key={index} href={`https://event.ddocdoc.com/curation/${v.groupId._id}`}>
							<img src={v.mainImage.url} alt={v.title} />
							<div className="banner__description">
								<h3 className="banner__description__title">{v.title}</h3>
								<span className="banner_description__sub-title">
									<strong className="banner_description_sub-title__mark">기획전</strong>
									{v.groupId.description}
								</span>
							</div>
						</a>
					</li>
				))}
			</ul>
		</InfiniteScroll>
	)
}

Posts.propTypes = {
	posts: PropTypes.array.isRequired
}

export default Posts;
