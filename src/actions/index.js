export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export const selectSubreddit = (subreddit) => ({
    type: SELECT_SUBREDDIT,
    subreddit
});

export const receivePosts = (subreddit, json, length) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.items.slice(0, length).map(child => {
            return child;
        }),
        totalItemLength: json.items.length
    }
}

const fetchPosts = (subreddit, length) => (dispatch) => {
    return fetch(`https://api.ddocdoc.com/v2/eventBanner?populate=true`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json, length)));
}

export const receiveUpdatePosts = (subreddit, json, posts, length) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: posts.concat(json.items.slice(posts.length, posts.length + length)).map(child => {
            return child;
        }),
        totalItemLength: json.items.length
    }
}

export const fetchUpdatePosts = (subreddit, posts, length) => (dispatch) => {
    return fetch(`https://api.ddocdoc.com/v2/eventBanner?populate=true`)
        .then(response => response.json())
        .then(json => dispatch(receiveUpdatePosts(subreddit, json, posts, length)));
}

export const fetchPostsIfNeeded = subreddit => (dispatch) => {
    return dispatch(fetchPosts(subreddit, 20));
}
