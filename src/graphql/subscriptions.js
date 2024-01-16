/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMuscle = /* GraphQL */ `
  subscription OnCreateMuscle($filter: ModelSubscriptionMuscleFilterInput) {
    onCreateMuscle(filter: $filter) {
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
export const onUpdateMuscle = /* GraphQL */ `
  subscription OnUpdateMuscle($filter: ModelSubscriptionMuscleFilterInput) {
    onUpdateMuscle(filter: $filter) {
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
export const onDeleteMuscle = /* GraphQL */ `
  subscription OnDeleteMuscle($filter: ModelSubscriptionMuscleFilterInput) {
    onDeleteMuscle(filter: $filter) {
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
export const onCreateMachine = /* GraphQL */ `
  subscription OnCreateMachine($filter: ModelSubscriptionMachineFilterInput) {
    onCreateMachine(filter: $filter) {
      id
      name
      exercises {
        nextToken
        __typename
      }
      gyms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMachine = /* GraphQL */ `
  subscription OnUpdateMachine($filter: ModelSubscriptionMachineFilterInput) {
    onUpdateMachine(filter: $filter) {
      id
      name
      exercises {
        nextToken
        __typename
      }
      gyms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMachine = /* GraphQL */ `
  subscription OnDeleteMachine($filter: ModelSubscriptionMachineFilterInput) {
    onDeleteMachine(filter: $filter) {
      id
      name
      exercises {
        nextToken
        __typename
      }
      gyms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      macines {
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
      difficulty
      hasWeight
      incrementPR
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      macines {
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
      difficulty
      hasWeight
      incrementPR
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      macines {
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
      difficulty
      hasWeight
      incrementPR
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
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
      nameLower
      percents
      difficulty
      creator {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      workoutCreatorId
      __typename
    }
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
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
      nameLower
      percents
      difficulty
      creator {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      workoutCreatorId
      __typename
    }
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
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
      nameLower
      percents
      difficulty
      creator {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      workoutCreatorId
      __typename
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
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
export const onCreateMyWorkout = /* GraphQL */ `
  subscription OnCreateMyWorkout(
    $filter: ModelSubscriptionMyWorkoutFilterInput
    $owner: String
  ) {
    onCreateMyWorkout(filter: $filter, owner: $owner) {
      id
      workout {
        id
        name
        imageUrl
        reps
        sets
        rests
        nameLower
        percents
        difficulty
        createdAt
        updatedAt
        workoutCreatorId
        __typename
      }
      rating
      completedTimes
      createdAt
      updatedAt
      myWorkoutWorkoutId
      owner
      __typename
    }
  }
`;
export const onUpdateMyWorkout = /* GraphQL */ `
  subscription OnUpdateMyWorkout(
    $filter: ModelSubscriptionMyWorkoutFilterInput
    $owner: String
  ) {
    onUpdateMyWorkout(filter: $filter, owner: $owner) {
      id
      workout {
        id
        name
        imageUrl
        reps
        sets
        rests
        nameLower
        percents
        difficulty
        createdAt
        updatedAt
        workoutCreatorId
        __typename
      }
      rating
      completedTimes
      createdAt
      updatedAt
      myWorkoutWorkoutId
      owner
      __typename
    }
  }
`;
export const onDeleteMyWorkout = /* GraphQL */ `
  subscription OnDeleteMyWorkout(
    $filter: ModelSubscriptionMyWorkoutFilterInput
    $owner: String
  ) {
    onDeleteMyWorkout(filter: $filter, owner: $owner) {
      id
      workout {
        id
        name
        imageUrl
        reps
        sets
        rests
        nameLower
        percents
        difficulty
        createdAt
        updatedAt
        workoutCreatorId
        __typename
      }
      rating
      completedTimes
      createdAt
      updatedAt
      myWorkoutWorkoutId
      owner
      __typename
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
      experience
      gym {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
        createdAt
        updatedAt
        __typename
      }
      streak
      thisWeekTime
      createdAt
      updatedAt
      gymProfilesId
      profileGymId
      __typename
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
      experience
      gym {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
        createdAt
        updatedAt
        __typename
      }
      streak
      thisWeekTime
      createdAt
      updatedAt
      gymProfilesId
      profileGymId
      __typename
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
      experience
      gym {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
        createdAt
        updatedAt
        __typename
      }
      streak
      thisWeekTime
      createdAt
      updatedAt
      gymProfilesId
      profileGymId
      __typename
    }
  }
`;
export const onCreateGymWeeklyAttendance = /* GraphQL */ `
  subscription OnCreateGymWeeklyAttendance(
    $filter: ModelSubscriptionGymWeeklyAttendanceFilterInput
    $owner: String
  ) {
    onCreateGymWeeklyAttendance(filter: $filter, owner: $owner) {
      id
      weekStart
      weekTime
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateGymWeeklyAttendance = /* GraphQL */ `
  subscription OnUpdateGymWeeklyAttendance(
    $filter: ModelSubscriptionGymWeeklyAttendanceFilterInput
    $owner: String
  ) {
    onUpdateGymWeeklyAttendance(filter: $filter, owner: $owner) {
      id
      weekStart
      weekTime
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteGymWeeklyAttendance = /* GraphQL */ `
  subscription OnDeleteGymWeeklyAttendance(
    $filter: ModelSubscriptionGymWeeklyAttendanceFilterInput
    $owner: String
  ) {
    onDeleteGymWeeklyAttendance(filter: $filter, owner: $owner) {
      id
      weekStart
      weekTime
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateGym = /* GraphQL */ `
  subscription OnCreateGym($filter: ModelSubscriptionGymFilterInput) {
    onCreateGym(filter: $filter) {
      id
      name
      rating
      ratingTotal
      address
      phone
      isRegistered
      demandNumber
      profiles {
        nextToken
        __typename
      }
      machines {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateGym = /* GraphQL */ `
  subscription OnUpdateGym($filter: ModelSubscriptionGymFilterInput) {
    onUpdateGym(filter: $filter) {
      id
      name
      rating
      ratingTotal
      address
      phone
      isRegistered
      demandNumber
      profiles {
        nextToken
        __typename
      }
      machines {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteGym = /* GraphQL */ `
  subscription OnDeleteGym($filter: ModelSubscriptionGymFilterInput) {
    onDeleteGym(filter: $filter) {
      id
      name
      rating
      ratingTotal
      address
      phone
      isRegistered
      demandNumber
      profiles {
        nextToken
        __typename
      }
      machines {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onCreateFriendRequest(filter: $filter) {
      id
      profileOutgoingRequestsId
      profileIncomingRequestsId
      sender {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
        __typename
      }
      receiver {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
        __typename
      }
      accepted
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onUpdateFriendRequest(filter: $filter) {
      id
      profileOutgoingRequestsId
      profileIncomingRequestsId
      sender {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
        __typename
      }
      receiver {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
        __typename
      }
      accepted
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onDeleteFriendRequest(filter: $filter) {
      id
      profileOutgoingRequestsId
      profileIncomingRequestsId
      sender {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
        __typename
      }
      receiver {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
        __typename
      }
      accepted
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      imageUrl
      author {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      imageUrl
      author {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      imageUrl
      author {
        id
        username
        ownerId
        imageUrl
        experience
        streak
        thisWeekTime
        createdAt
        updatedAt
        gymProfilesId
        profileGymId
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
        __typename
      }
      exercise {
        id
        name
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        __typename
      }
      exercise {
        id
        name
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        __typename
      }
      exercise {
        id
        name
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
export const onCreateMachineExercises = /* GraphQL */ `
  subscription OnCreateMachineExercises(
    $filter: ModelSubscriptionMachineExercisesFilterInput
  ) {
    onCreateMachineExercises(filter: $filter) {
      id
      machineId
      exerciseId
      machine {
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
        difficulty
        hasWeight
        incrementPR
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
export const onUpdateMachineExercises = /* GraphQL */ `
  subscription OnUpdateMachineExercises(
    $filter: ModelSubscriptionMachineExercisesFilterInput
  ) {
    onUpdateMachineExercises(filter: $filter) {
      id
      machineId
      exerciseId
      machine {
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
        difficulty
        hasWeight
        incrementPR
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
export const onDeleteMachineExercises = /* GraphQL */ `
  subscription OnDeleteMachineExercises(
    $filter: ModelSubscriptionMachineExercisesFilterInput
  ) {
    onDeleteMachineExercises(filter: $filter) {
      id
      machineId
      exerciseId
      machine {
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
        difficulty
        hasWeight
        incrementPR
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
export const onCreateMachineGyms = /* GraphQL */ `
  subscription OnCreateMachineGyms(
    $filter: ModelSubscriptionMachineGymsFilterInput
  ) {
    onCreateMachineGyms(filter: $filter) {
      id
      machineId
      gymId
      machine {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      gym {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
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
export const onUpdateMachineGyms = /* GraphQL */ `
  subscription OnUpdateMachineGyms(
    $filter: ModelSubscriptionMachineGymsFilterInput
  ) {
    onUpdateMachineGyms(filter: $filter) {
      id
      machineId
      gymId
      machine {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      gym {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
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
export const onDeleteMachineGyms = /* GraphQL */ `
  subscription OnDeleteMachineGyms(
    $filter: ModelSubscriptionMachineGymsFilterInput
  ) {
    onDeleteMachineGyms(filter: $filter) {
      id
      machineId
      gymId
      machine {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      gym {
        id
        name
        rating
        ratingTotal
        address
        phone
        isRegistered
        demandNumber
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
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        nameLower
        percents
        difficulty
        createdAt
        updatedAt
        workoutCreatorId
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        nameLower
        percents
        difficulty
        createdAt
        updatedAt
        workoutCreatorId
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        increment
        timePerRep
        lottie
        difficulty
        hasWeight
        incrementPR
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
        nameLower
        percents
        difficulty
        createdAt
        updatedAt
        workoutCreatorId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
