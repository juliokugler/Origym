import React, { useState } from "react";
import styles from "./CardsContainer.module.css";
import WaterIntakeCard from "./WaterIntakeCard";
import StepsCounterCard from "./StepsCounterCard";
import HeartRateCard from "./HeartRateCard";
import WeightCard from "./WeightCard";
import SleepCard from "./SleepCard";

const CardsContainer = ({ user, userData, dailyInfo, t, onUserInfoChange }) => {
 

  if (!userData) {
    return <p>{t("loading")}...</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.healthCardContainer}>
        <div className={styles.row}>
        
        <StepsCounterCard  onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/> 
        <WaterIntakeCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/> 
        <WeightCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        <HeartRateCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        <SleepCard onUserInfoChange={onUserInfoChange} user={user} userData={userData} t={t} dailyInfo={dailyInfo}/>
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;