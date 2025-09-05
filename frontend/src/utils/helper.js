export const getPollBookmarked = (pollId, userBookmarks = []) => {
    return userBookmarks.include(pollId)
}