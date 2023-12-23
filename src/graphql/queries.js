/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMuscle = /* GraphQL */ `
  query GetMuscle($id: ID!) {
    getMuscle(id: $id) {
      id
      name
      exercises {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      workouts {
        nextToken
        __typename
      }
      time
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      rating
      weight
      createdAt
      updatedAt
      myExerciseExerciseId
      owner
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      username
      owner
      createdAt
      updatedAt
      __typename
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
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      exercise {
        id
        name
        time
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      workout {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
