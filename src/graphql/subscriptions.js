/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMuscle = /* GraphQL */ `
  subscription OnCreateMuscle($filter: ModelSubscriptionMuscleFilterInput) {
    onCreateMuscle(filter: $filter) {
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
export const onUpdateMuscle = /* GraphQL */ `
  subscription OnUpdateMuscle($filter: ModelSubscriptionMuscleFilterInput) {
    onUpdateMuscle(filter: $filter) {
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
export const onDeleteMuscle = /* GraphQL */ `
  subscription OnDeleteMuscle($filter: ModelSubscriptionMuscleFilterInput) {
    onDeleteMuscle(filter: $filter) {
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
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
export const onCreateMyExercise = /* GraphQL */ `
  subscription OnCreateMyExercise(
    $filter: ModelSubscriptionMyExerciseFilterInput
    $owner: String
  ) {
    onCreateMyExercise(filter: $filter, owner: $owner) {
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
export const onUpdateMyExercise = /* GraphQL */ `
  subscription OnUpdateMyExercise(
    $filter: ModelSubscriptionMyExerciseFilterInput
    $owner: String
  ) {
    onUpdateMyExercise(filter: $filter, owner: $owner) {
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
export const onDeleteMyExercise = /* GraphQL */ `
  subscription OnDeleteMyExercise(
    $filter: ModelSubscriptionMyExerciseFilterInput
    $owner: String
  ) {
    onDeleteMyExercise(filter: $filter, owner: $owner) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
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
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onCreateFriendRequest(filter: $filter) {
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
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onUpdateFriendRequest(filter: $filter) {
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
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onDeleteFriendRequest(filter: $filter) {
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
export const onCreateMuscleExercises = /* GraphQL */ `
  subscription OnCreateMuscleExercises(
    $filter: ModelSubscriptionMuscleExercisesFilterInput
  ) {
    onCreateMuscleExercises(filter: $filter) {
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
export const onUpdateMuscleExercises = /* GraphQL */ `
  subscription OnUpdateMuscleExercises(
    $filter: ModelSubscriptionMuscleExercisesFilterInput
  ) {
    onUpdateMuscleExercises(filter: $filter) {
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
export const onDeleteMuscleExercises = /* GraphQL */ `
  subscription OnDeleteMuscleExercises(
    $filter: ModelSubscriptionMuscleExercisesFilterInput
  ) {
    onDeleteMuscleExercises(filter: $filter) {
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
export const onCreateWorkoutExercises = /* GraphQL */ `
  subscription OnCreateWorkoutExercises(
    $filter: ModelSubscriptionWorkoutExercisesFilterInput
  ) {
    onCreateWorkoutExercises(filter: $filter) {
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
export const onUpdateWorkoutExercises = /* GraphQL */ `
  subscription OnUpdateWorkoutExercises(
    $filter: ModelSubscriptionWorkoutExercisesFilterInput
  ) {
    onUpdateWorkoutExercises(filter: $filter) {
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
export const onDeleteWorkoutExercises = /* GraphQL */ `
  subscription OnDeleteWorkoutExercises(
    $filter: ModelSubscriptionWorkoutExercisesFilterInput
  ) {
    onDeleteWorkoutExercises(filter: $filter) {
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
