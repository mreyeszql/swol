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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMachine = /* GraphQL */ `
  mutation CreateMachine(
    $input: CreateMachineInput!
    $condition: ModelMachineConditionInput
  ) {
    createMachine(input: $input, condition: $condition) {
      id
      name
      increment
      exercises {
        nextToken
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
      gymMachinesId
      machineGymId
      __typename
    }
  }
`;
export const updateMachine = /* GraphQL */ `
  mutation UpdateMachine(
    $input: UpdateMachineInput!
    $condition: ModelMachineConditionInput
  ) {
    updateMachine(input: $input, condition: $condition) {
      id
      name
      increment
      exercises {
        nextToken
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
      gymMachinesId
      machineGymId
      __typename
    }
  }
`;
export const deleteMachine = /* GraphQL */ `
  mutation DeleteMachine(
    $input: DeleteMachineInput!
    $condition: ModelMachineConditionInput
  ) {
    deleteMachine(input: $input, condition: $condition) {
      id
      name
      increment
      exercises {
        nextToken
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
      gymMachinesId
      machineGymId
      __typename
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
        __typename
      }
      machines {
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
        __typename
      }
      machines {
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
        __typename
      }
      machines {
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
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
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
      gyms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      workoutCreatorId
      __typename
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
      gyms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      workoutCreatorId
      __typename
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
      gyms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      workoutCreatorId
      __typename
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
export const createMyWorkout = /* GraphQL */ `
  mutation CreateMyWorkout(
    $input: CreateMyWorkoutInput!
    $condition: ModelMyWorkoutConditionInput
  ) {
    createMyWorkout(input: $input, condition: $condition) {
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
export const updateMyWorkout = /* GraphQL */ `
  mutation UpdateMyWorkout(
    $input: UpdateMyWorkoutInput!
    $condition: ModelMyWorkoutConditionInput
  ) {
    updateMyWorkout(input: $input, condition: $condition) {
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
export const deleteMyWorkout = /* GraphQL */ `
  mutation DeleteMyWorkout(
    $input: DeleteMyWorkoutInput!
    $condition: ModelMyWorkoutConditionInput
  ) {
    deleteMyWorkout(input: $input, condition: $condition) {
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
export const createGymWeeklyAttendance = /* GraphQL */ `
  mutation CreateGymWeeklyAttendance(
    $input: CreateGymWeeklyAttendanceInput!
    $condition: ModelGymWeeklyAttendanceConditionInput
  ) {
    createGymWeeklyAttendance(input: $input, condition: $condition) {
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
export const updateGymWeeklyAttendance = /* GraphQL */ `
  mutation UpdateGymWeeklyAttendance(
    $input: UpdateGymWeeklyAttendanceInput!
    $condition: ModelGymWeeklyAttendanceConditionInput
  ) {
    updateGymWeeklyAttendance(input: $input, condition: $condition) {
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
export const deleteGymWeeklyAttendance = /* GraphQL */ `
  mutation DeleteGymWeeklyAttendance(
    $input: DeleteGymWeeklyAttendanceInput!
    $condition: ModelGymWeeklyAttendanceConditionInput
  ) {
    deleteGymWeeklyAttendance(input: $input, condition: $condition) {
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
export const createGym = /* GraphQL */ `
  mutation CreateGym(
    $input: CreateGymInput!
    $condition: ModelGymConditionInput
  ) {
    createGym(input: $input, condition: $condition) {
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
      workouts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGym = /* GraphQL */ `
  mutation UpdateGym(
    $input: UpdateGymInput!
    $condition: ModelGymConditionInput
  ) {
    updateGym(input: $input, condition: $condition) {
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
      workouts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGym = /* GraphQL */ `
  mutation DeleteGym(
    $input: DeleteGymInput!
    $condition: ModelGymConditionInput
  ) {
    deleteGym(input: $input, condition: $condition) {
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
      workouts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
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
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createMachineExercises = /* GraphQL */ `
  mutation CreateMachineExercises(
    $input: CreateMachineExercisesInput!
    $condition: ModelMachineExercisesConditionInput
  ) {
    createMachineExercises(input: $input, condition: $condition) {
      id
      machineId
      exerciseId
      machine {
        id
        name
        increment
        createdAt
        updatedAt
        gymMachinesId
        machineGymId
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
export const updateMachineExercises = /* GraphQL */ `
  mutation UpdateMachineExercises(
    $input: UpdateMachineExercisesInput!
    $condition: ModelMachineExercisesConditionInput
  ) {
    updateMachineExercises(input: $input, condition: $condition) {
      id
      machineId
      exerciseId
      machine {
        id
        name
        increment
        createdAt
        updatedAt
        gymMachinesId
        machineGymId
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
export const deleteMachineExercises = /* GraphQL */ `
  mutation DeleteMachineExercises(
    $input: DeleteMachineExercisesInput!
    $condition: ModelMachineExercisesConditionInput
  ) {
    deleteMachineExercises(input: $input, condition: $condition) {
      id
      machineId
      exerciseId
      machine {
        id
        name
        increment
        createdAt
        updatedAt
        gymMachinesId
        machineGymId
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
export const createWorkoutGyms = /* GraphQL */ `
  mutation CreateWorkoutGyms(
    $input: CreateWorkoutGymsInput!
    $condition: ModelWorkoutGymsConditionInput
  ) {
    createWorkoutGyms(input: $input, condition: $condition) {
      id
      workoutId
      gymId
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
export const updateWorkoutGyms = /* GraphQL */ `
  mutation UpdateWorkoutGyms(
    $input: UpdateWorkoutGymsInput!
    $condition: ModelWorkoutGymsConditionInput
  ) {
    updateWorkoutGyms(input: $input, condition: $condition) {
      id
      workoutId
      gymId
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
export const deleteWorkoutGyms = /* GraphQL */ `
  mutation DeleteWorkoutGyms(
    $input: DeleteWorkoutGymsInput!
    $condition: ModelWorkoutGymsConditionInput
  ) {
    deleteWorkoutGyms(input: $input, condition: $condition) {
      id
      workoutId
      gymId
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
