import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listProfiles } from "graphql/queries";

const handleFetchAuth = async () => {
    client = generateClient();
    const { userId } = await getCurrentUser();
    const query = `
    query MyQuery {
        profilesByOwnerId(ownerId: "${userId}") {
        items {
            id
            username
            incomingRequests {
            items {
                id
                accepted
                profileOutgoingRequestsId
                sender {
                    username
                }
            }
            }
            outgoingRequests {
            items {
                id
                accepted
                profileIncomingRequestsId
                receiver {
                    username
                }
            }
            }
            posts {
                items {
                    id
                    text
                    createdAt
                }
            }
        }
        }
    }
    `;
    const profile = await client.graphql({
        query: query,
    });

    return profile;
};

const handleFetchProfiles = async (client, localProfile, searchText) => {
    const variables = {
        filter: {
            username: {
                contains: searchText
            },
            id: {
                ne: localProfile.id
            },
        }
    };

    const result = await client.graphql({
        query: listProfiles,
        variables: variables
    });

    const updatedProfiles = result.data.listProfiles.items.map(profile => {
        const incomingRequest = localProfile.incomingRequests.items.filter(request =>
            request.profileOutgoingRequestsId === profile.id
        );

        const outgoingRequest = localProfile.outgoingRequests.items.filter(request =>
            request.profileIncomingRequestsId === profile.id
        );

        if (incomingRequest.length > 0) {
            if (incomingRequest[0].accepted) {
                return {
                    ...profile,
                    connectionType: "remove",
                    requestId: incomingRequest[0].id,
                };
            } else {
                return {
                    ...profile,
                    connectionType: "accept",
                    requestId: incomingRequest[0].id,
                };
            }
        }

        if (outgoingRequest.length > 0) {
            if (outgoingRequest[0].accepted) {
                return {
                    ...profile,
                    connectionType: "remove",
                    requestId: outgoingRequest[0].id,
                };
            } else {
                return {
                    ...profile,
                    connectionType: "cancel request",
                    requestId: outgoingRequest[0].id,
                };
            }
        }

        return {
            ...profile,
            connectionType: "connect",
            requestId: null,
        };
        
    });
    return updatedProfiles;
};

export { handleFetchAuth, handleFetchProfiles };