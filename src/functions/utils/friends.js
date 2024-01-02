import { createFriendRequest, deleteFriendRequest, updateFriendRequest } from "graphql/mutations";


const handleFriendRequest = async (client, profile, receiverProfileId, senderProfileId) => {
    if (profile.connectionType === "connect") {
        await client.graphql({
            query: createFriendRequest,
            variables: {
                input: {accepted: false, profileIncomingRequestsId: receiverProfileId, profileOutgoingRequestsId: senderProfileId}
            }
        });
    } else if (profile.connectionType === "cancel request" || profile.connectionType === "remove") {
        await client.graphql({
            query: deleteFriendRequest,
            variables: {
                input: {
                    id: profile.requestId
                }
            }
        });
    } else if (profile.connectionType === "accept") {
        await client.graphql({
            query: updateFriendRequest,
            variables: {
                input: {
                    id: profile?.__typename ? profile.requestId : profile.id,
                    accepted: true,
                }
            }
        });
    }
}

export { handleFriendRequest };