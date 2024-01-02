import { handleFetchAuth } from "functions/utils/profile";
import { generateClient } from "aws-amplify/api";

const handleFetchPosts = async () => {
    const client = generateClient();
    const profile = await handleFetchAuth();

    const incomingFriends = profile.data.profilesByOwnerId.items[0].incomingRequests.items
        .filter(profile => {
            return profile.accepted;
        })
        .map(profile => {
            return { profilePostsId: { eq: profile.profileOutgoingRequestsId } };
        })
    const outgoingFriends = profile.data.profilesByOwnerId.items[0].outgoingRequests.items
        .filter(profile => {
            return profile.accepted;
        })
        .map(profile => {
            return { profilePostsId: { eq: profile.profileIncomingRequestsId } };
        });

    const friends = incomingFriends.concat(outgoingFriends).concat([{profilePostsId: {eq: profile.data.profilesByOwnerId.items[0].id}}]);

    if (friends.length === 0) {
        return selfPosts;
    } else {
        const query = `
            query MyQuery($filter: ModelPostFilterInput) {
                postsByDate(type: "Post", sortDirection: DESC, filter: $filter) {
                items {
                    id
                    postKind
                    text
                    createdAt
                    imageUrl
                    author {
                    imageUrl
                    username
                    }
                }
                }
            }
            `;
        const posts = await client.graphql({
            query: query,
            variables: {
                filter: {
                    or: friends,
                }
            }
        });
        return posts.data.postsByDate.items;
    }
}

export { handleFetchPosts };