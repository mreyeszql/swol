import { createMyExercise, updateMyExercise, createPost } from "graphql/mutations";

const handleUpdatedExercise = async (client, exercise, existingExercise, weightChange, localProfile) => {
    // Exercise already exists, update the weight
    const newWeight = Math.max(existingExercise.weight + weightChange, 0);
    const updatedExercise = { ...existingExercise, weight: newWeight };

    // Update the exercise in the database
    if (existingExercise.weight !== newWeight) {
        client.graphql({
            query: updateMyExercise,
            variables: { input: { 
                id: updatedExercise.id, 
                weight: updatedExercise.weight,
                maxweight: Math.max(updatedExercise.weight, existingExercise.weight)
            } }
        });

        if (updatedExercise.weight > existingExercise.weight && updatedExercise.weight % exercise.increment === 0 && updatedExercise.weight > 0) {
            client.graphql({
                query: createPost,
                variables: {
                    input: {
                        profilePostsId: localProfile.id,
                        text: `${localProfile.username} just hit a ${updatedExercise.weight} lbs. PR on ${exercise.name}!`,
                    }
                }
            });
        }
    }
    return updatedExercise;
};

const handleNewExercise = async (client, exercise, weightChange) => {
    // Exercise doesn't exist, create a new MyExercise entry
    const newExercise = {
        myExerciseExerciseId: exercise.id,
        weight: weightChange,
        // Add other necessary fields
    };

    if (weightChange > 0) {
        // Create the new exercise in the database
        await client.graphql({
            query: createMyExercise,
            variables: { input: newExercise }
        });
    }

    
    return newExercise;
};

export { handleNewExercise, handleUpdatedExercise };