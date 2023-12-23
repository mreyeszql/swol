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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
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
