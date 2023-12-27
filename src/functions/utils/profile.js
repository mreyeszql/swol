import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";

const handleFetchAuth = async () => {
    client = generateClient();
    const { userId } = await getCurrentUser();
    const query = `
    query MyQuery {
        profilesByOwnerId(ownerId: "${userId}") {
        items {
            id
            incomingRequests {
            items {
                id
                accepted
                profileOutgoingRequestsId
            }
            }
            outgoingRequests {
            items {
                id
                accepted
                profileIncomingRequestsId
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

export { handleFetchAuth };