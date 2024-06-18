import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./WorkoutsPage.module.css";

// Components
import Header from "../../components/Header/Header";
import CreateWorkout from "../../components/Workouts/CreateWorkout/CreateWorkout";
import OneRMCalculator from "../../components/Workouts/OneRMCalculator/OneRMCalculator";
import Favorites from "../../components/Workouts/Favorites/Favorites";
import WeeklyWorkoutCard from "../../components/Workouts/WeeklyWorkoutCard/WeeklyWorkoutCard";
import HeartRateCard from "../../components/HeartRateCard/HeartRateCard";
import RecommendedWorkouts from "../../components/Workouts/RecommendedWorkouts/RecommendedWorkouts";

// Hooks
import useFetchExercises from "../../hooks/useFetchExercises";

const Workouts = ({ user, t, userData, dailyInfo }) => {
  const [isCreateWorkoutOpen, setIsCreateWorkoutOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [currentExerciseListName, setCurrentExerciseListName] = useState("");
  const [workoutChange, setWorkoutChange] = useState(false);
  const [favoriteChange, setFavoriteChange] = useState(false);

  const fetchedWorkouts = useFetchExercises(workoutChange);
 console.log(userData)
  useEffect(() => {
    setWorkouts(fetchedWorkouts);
  }, [fetchedWorkouts]);

  const handleWorkoutChange = () => {
    setWorkoutChange(!workoutChange);
  };

  const handleFavoriteToggle = () => {
    setFavoriteChange(!favoriteChange);
  };

  const handleExerciseListNameChange = (exerciseListName) => {
    setCurrentExerciseListName(exerciseListName);
  };

  const handleToggleCreateWorkout = (day) => {
    setIsCreateWorkoutOpen(!isCreateWorkoutOpen);
    setSelectedDay(day);
  };


  return (
    <div className="container">
      <Header userData={userData} t={t} pageType="workouts" />
      <div className="mainSection">
        <div className={styles.firstColumn}>
          <div className={classNames("card", styles.calculator)}>
            <h3 className="title">{t("oneRMCalculator")}</h3>
            <OneRMCalculator t={t} />
          </div>
          <div className={classNames("card", styles.recommendedWorkouts)}>
            <h3 className="title">{t("recommendedWorkouts")}</h3>
            <RecommendedWorkouts />
          </div>
        </div>
        <div className={styles.secondColumn}>
          <div className={classNames("mainCard", styles.heartRate)}>
            <h3 className={styles.title2}>{t("heartRate")}</h3>
            <HeartRateCard />
          </div>
          <div className={classNames("card", styles.exerciseBenchmarks)}>
            <div className={styles.exerciseBenchmarksBackground}>
              <h3 className="title">{t("exerciseBenchmarks")}</h3>
              <Favorites workouts={workouts} favoriteChange={favoriteChange} t={t} />
            </div>
          </div>
        </div>
        <div className={styles.thirdColumn}>
          <div className={classNames("card", styles.workoutPlan)}>
            <h3 className="title">{t("workoutPlan")}</h3>
            <WeeklyWorkoutCard
              workouts={workouts}
              onOpen={handleToggleCreateWorkout}
              onExerciseListNameChange={handleExerciseListNameChange}
              onFavoriteToggle={handleFavoriteToggle}
              user={user}
              t={t}
            />
          </div>
        </div>
      </div>
      {isCreateWorkoutOpen && (
        <CreateWorkout
          onClose={handleToggleCreateWorkout}
          selectedDay={selectedDay}
          onCreate={handleWorkoutChange}
          weight={userData.userProfile.weight}
          t={t}
        />
      )}
    </div>
  );
};

export default Workouts;