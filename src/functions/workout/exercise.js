import { createMyExercise, updateMyExercise, createPost } from "graphql/mutations";

const handleUpdatedExercise = async (client, existingExercise, updatedExercise, exercise, localProfile) => {
    // Update the exercise in the database
    if (existingExercise.weight !== updatedExercise.weight) {
        client.graphql({
            query: updateMyExercise,
            variables: { input: { 
                id: updatedExercise.id, 
                weight: updatedExercise.weight,
                maxweight: Math.max(updatedExercise.weight, existingExercise.weight)
            } }
        });

        // if (updatedExercise.weight - (updatedExercise.weight % exercise.increment) > existingExercise.maxweight) {
        //     client.graphql({
        //         query: createPost,
        //         variables: {
        //             input: {
        //                 profilePostsId: localProfile.id,
        //                 type: "Post",
        //                 postKind: "PRGoal",
        //                 text: `${localProfile.username} just hit a ${updatedExercise.weight} lbs. PR on ${exercise.name}!`,
        //             }
        //         }
        //     });
        // }
    }
    return updatedExercise;
};

const handleNewExercise = async (client, updatedExercise, exercise) => {
    // Exercise doesn't exist, create a new MyExercise entry
    const newExercise = {
        myExerciseExerciseId: exercise.id,
        weight: updatedExercise.weight,
        maxweight: updatedExercise.weight,
        // Add other necessary fields
    };

    // Create the new exercise in the database
    const result = await client.graphql({
        query: createMyExercise,
        variables: { input: newExercise }
    });
    
    return result.data.createMyExercise;
};

export { handleNewExercise, handleUpdatedExercise };