import React from 'react';
import PropTypes from 'prop-types';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import './Posts.css';

/* <ul>
  {posts.map((post, i) =>
    <li key={i}>{post.title}</li>
  )}
</ul> */

const Posts = ({posts, onFetchMoreData}) => {
  // console.log("Posts", posts, onFetchMoreData);
  return (
    <InfiniteScroll
            dataLength={posts.length}
            next={onFetchMoreData}
            hasMore={true}
            loader={<span>Loading...</span>}
        >
            {posts.map((i, index) => (
                <div className="banner" key={index}>
                    div - #{index}
                </div>
            ))}
    </InfiniteScroll>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
