/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMuscle = /* GraphQL */ `
  query GetMuscle($id: ID!) {
    getMuscle(id: $id) {
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
export const listMuscles = /* GraphQL */ `
  query ListMuscles(
    $filter: ModelMuscleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMuscles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
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
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMyExercise = /* GraphQL */ `
  query GetMyExercise($id: ID!) {
    getMyExercise(id: $id) {
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
export const listMyExercises = /* GraphQL */ `
  query ListMyExercises(
    $filter: ModelMyExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMyExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rating
        weight
        createdAt
        updatedAt
        myExerciseExerciseId
        owner
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriendRequest = /* GraphQL */ `
  query GetFriendRequest($id: ID!) {
    getFriendRequest(id: $id) {
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
export const listFriendRequests = /* GraphQL */ `
  query ListFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        accepted
        createdAt
        updatedAt
        profileIncomingRequestsId
        profileOutgoingRequestsId
      }
      nextToken
    }
  }
`;
export const getMuscleExercises = /* GraphQL */ `
  query GetMuscleExercises($id: ID!) {
    getMuscleExercises(id: $id) {
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
export const listMuscleExercises = /* GraphQL */ `
  query ListMuscleExercises(
    $filter: ModelMuscleExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMuscleExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        muscleId
        exerciseId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkoutExercises = /* GraphQL */ `
  query GetWorkoutExercises($id: ID!) {
    getWorkoutExercises(id: $id) {
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
export const listWorkoutExercises = /* GraphQL */ `
  query ListWorkoutExercises(
    $filter: ModelWorkoutExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        exerciseId
        workoutId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const profilesByOwnerId = /* GraphQL */ `
  query ProfilesByOwnerId(
    $ownerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profilesByOwnerId(
      ownerId: $ownerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        ownerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const muscleExercisesByMuscleId = /* GraphQL */ `
  query MuscleExercisesByMuscleId(
    $muscleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMuscleExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    muscleExercisesByMuscleId(
      muscleId: $muscleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        muscleId
        exerciseId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const muscleExercisesByExerciseId = /* GraphQL */ `
  query MuscleExercisesByExerciseId(
    $exerciseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMuscleExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    muscleExercisesByExerciseId(
      exerciseId: $exerciseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        muscleId
        exerciseId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutExercisesByExerciseId = /* GraphQL */ `
  query WorkoutExercisesByExerciseId(
    $exerciseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutExercisesByExerciseId(
      exerciseId: $exerciseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        exerciseId
        workoutId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutExercisesByWorkoutId = /* GraphQL */ `
  query WorkoutExercisesByWorkoutId(
    $workoutId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutExercisesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutExercisesByWorkoutId(
      workoutId: $workoutId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        exerciseId
        workoutId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
