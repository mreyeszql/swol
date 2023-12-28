import { handleFetchAuth } from "functions/utils/profile";
import { generateClient } from "aws-amplify/api";
import { listPosts } from "graphql/queries";

const handleFetchPosts = async () => {
    const client = generateClient();
    const profile = await handleFetchAuth();
    const incomingFriends = profile.data.profilesByOwnerId.items[0].incomingRequests.items
        .filter(profile => {
            return profile.accepted;
        })
        .map(profile => {
            return { id: profile.profileOutgoingRequestsId };
        })
    const outgoingFriends = profile.data.profilesByOwnerId.items[0].outgoingRequests.items
        .filter(profile => {
            return profile.accepted;
        })
        .map(profile => {
            return { id: profile.profileIncomingRequestsId };
        });

    const friends = incomingFriends.concat(outgoingFriends);
    
    if (friends.length === 0) {
        return [];
    } else {
        const posts = await client.graphql({
            query: listPosts,
            variables: {
                filter: {
                    or: friends
                }
            }
        });
        return posts.data.listPosts.items;
    }
}

export { handleFetchPosts };