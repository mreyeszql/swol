/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMuscle = /* GraphQL */ `
  mutation CreateMuscle(
    $input: CreateMuscleInput!
    $condition: ModelMuscleConditionInput
  ) {
    createMuscle(input: $input, condition: $condition) {
      id
      name
      exercises {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMuscle = /* GraphQL */ `
  mutation UpdateMuscle(
    $input: UpdateMuscleInput!
    $condition: ModelMuscleConditionInput
  ) {
    updateMuscle(input: $input, condition: $condition) {
      id
      name
      exercises {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMuscle = /* GraphQL */ `
  mutation DeleteMuscle(
    $input: DeleteMuscleInput!
    $condition: ModelMuscleConditionInput
  ) {
    deleteMuscle(input: $input, condition: $condition) {
      id
      name
      exercises {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
      id
      name
      muscles {
        nextToken
      }
      workouts {
        nextToken
      }
      time
      createdAt
      updatedAt
    }
  }
`;
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
      id
      name
      muscles {
        nextToken
      }
      workouts {
        nextToken
      }
      time
      createdAt
      updatedAt
    }
  }
`;
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
      id
      name
      muscles {
        nextToken
      }
      workouts {
        nextToken
      }
      time
      createdAt
      updatedAt
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      name
      exercises {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      name
      exercises {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      name
      exercises {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMyExercise = /* GraphQL */ `
  mutation CreateMyExercise(
    $input: CreateMyExerciseInput!
    $condition: ModelMyExerciseConditionInput
  ) {
    createMyExercise(input: $input, condition: $condition) {
      id
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      rating
      weight
      createdAt
      updatedAt
      myExerciseExerciseId
      owner
    }
  }
`;
export const updateMyExercise = /* GraphQL */ `
  mutation UpdateMyExercise(
    $input: UpdateMyExerciseInput!
    $condition: ModelMyExerciseConditionInput
  ) {
    updateMyExercise(input: $input, condition: $condition) {
      id
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      rating
      weight
      createdAt
      updatedAt
      myExerciseExerciseId
      owner
    }
  }
`;
export const deleteMyExercise = /* GraphQL */ `
  mutation DeleteMyExercise(
    $input: DeleteMyExerciseInput!
    $condition: ModelMyExerciseConditionInput
  ) {
    deleteMyExercise(input: $input, condition: $condition) {
      id
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      rating
      weight
      createdAt
      updatedAt
      myExerciseExerciseId
      owner
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      username
      ownerId
      incomingRequests {
        nextToken
      }
      outgoingRequests {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      username
      ownerId
      incomingRequests {
        nextToken
      }
      outgoingRequests {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      username
      ownerId
      incomingRequests {
        nextToken
      }
      outgoingRequests {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
      id
      sender {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      receiver {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      accepted
      createdAt
      updatedAt
      profileIncomingRequestsId
      profileOutgoingRequestsId
    }
  }
`;
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
      id
      sender {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      receiver {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      accepted
      createdAt
      updatedAt
      profileIncomingRequestsId
      profileOutgoingRequestsId
    }
  }
`;
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
      id
      sender {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      receiver {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      accepted
      createdAt
      updatedAt
      profileIncomingRequestsId
      profileOutgoingRequestsId
    }
  }
`;
export const createMuscleExercises = /* GraphQL */ `
  mutation CreateMuscleExercises(
    $input: CreateMuscleExercisesInput!
    $condition: ModelMuscleExercisesConditionInput
  ) {
    createMuscleExercises(input: $input, condition: $condition) {
      id
      muscleId
      exerciseId
      muscle {
        id
        name
        createdAt
        updatedAt
      }
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMuscleExercises = /* GraphQL */ `
  mutation UpdateMuscleExercises(
    $input: UpdateMuscleExercisesInput!
    $condition: ModelMuscleExercisesConditionInput
  ) {
    updateMuscleExercises(input: $input, condition: $condition) {
      id
      muscleId
      exerciseId
      muscle {
        id
        name
        createdAt
        updatedAt
      }
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMuscleExercises = /* GraphQL */ `
  mutation DeleteMuscleExercises(
    $input: DeleteMuscleExercisesInput!
    $condition: ModelMuscleExercisesConditionInput
  ) {
    deleteMuscleExercises(input: $input, condition: $condition) {
      id
      muscleId
      exerciseId
      muscle {
        id
        name
        createdAt
        updatedAt
      }
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createWorkoutExercises = /* GraphQL */ `
  mutation CreateWorkoutExercises(
    $input: CreateWorkoutExercisesInput!
    $condition: ModelWorkoutExercisesConditionInput
  ) {
    createWorkoutExercises(input: $input, condition: $condition) {
      id
      exerciseId
      workoutId
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      workout {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateWorkoutExercises = /* GraphQL */ `
  mutation UpdateWorkoutExercises(
    $input: UpdateWorkoutExercisesInput!
    $condition: ModelWorkoutExercisesConditionInput
  ) {
    updateWorkoutExercises(input: $input, condition: $condition) {
      id
      exerciseId
      workoutId
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      workout {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteWorkoutExercises = /* GraphQL */ `
  mutation DeleteWorkoutExercises(
    $input: DeleteWorkoutExercisesInput!
    $condition: ModelWorkoutExercisesConditionInput
  ) {
    deleteWorkoutExercises(input: $input, condition: $condition) {
      id
      exerciseId
      workoutId
      exercise {
        id
        name
        time
        createdAt
        updatedAt
      }
      workout {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
