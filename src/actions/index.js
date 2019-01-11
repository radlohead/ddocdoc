export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit, json) => {
  console.log("receivePosts", subreddit, json.items);
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.items.slice(0, 20).map(child => {
      // console.log("async", child);
      return child;
    }),
    receivedAt: Date.now()
  }
}

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://api.ddocdoc.com/v2/eventBanner?populate=true`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

export const receiveUpdatePosts = (subreddit, json, posts, length) => {
  console.log("receiveUpdatePosts", subreddit, json, posts, length);
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: posts.concat(json.items.slice(posts.length, posts.length + length)).map(child => {
      // console.log("receiveUpdatePosts async", child);
      return child;
    }),
    receivedAt: Date.now()
  }
}

export const fetchUpdatePosts = (subreddit, posts, length) => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://api.ddocdoc.com/v2/eventBanner?populate=true`)
    .then(response => response.json())
    .then(json => dispatch(receiveUpdatePosts(subreddit, json, posts, length)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
