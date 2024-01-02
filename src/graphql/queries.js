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
      increment
      timePerRep
      lottie
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
        increment
        timePerRep
        lottie
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
      imageUrl
      exercises {
        nextToken
        __typename
      }
      reps
      sets
      rests
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
        imageUrl
        reps
        sets
        rests
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
        increment
        timePerRep
        lottie
        createdAt
        updatedAt
        __typename
      }
      rating
      weight
      maxweight
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
        maxweight
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
      ownerId
      incomingRequests {
        nextToken
        __typename
      }
      outgoingRequests {
        nextToken
        __typename
      }
      posts {
        nextToken
        __typename
      }
      imageUrl
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
        ownerId
        imageUrl
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        imageUrl
        createdAt
        updatedAt
        __typename
      }
      receiver {
        id
        username
        ownerId
        imageUrl
        createdAt
        updatedAt
        __typename
      }
      accepted
      createdAt
      updatedAt
      profileIncomingRequestsId
      profileOutgoingRequestsId
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      imageUrl
      author {
        id
        username
        ownerId
        imageUrl
        createdAt
        updatedAt
        __typename
      }
      postKind
      text
      type
      createdAt
      updatedAt
      profilePostsId
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageUrl
        postKind
        text
        type
        createdAt
        updatedAt
        profilePostsId
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
        increment
        timePerRep
        lottie
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
        increment
        timePerRep
        lottie
        createdAt
        updatedAt
        __typename
      }
      workout {
        id
        name
        imageUrl
        reps
        sets
        rests
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
        imageUrl
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByDate = /* GraphQL */ `
  query PostsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        imageUrl
        postKind
        text
        type
        createdAt
        updatedAt
        profilePostsId
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
