import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import EmojiPicker from 'emoji-picker-react';
import { FaEdit, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import styles from "./MainProfile.module.css";
import facebook_inactive from "../../../assets/Icons/Facebook_inactive.png";
import instagram_active from "../../../assets/Icons/Instagram_active.png";
import twitter_active from "../../../assets/Icons/Twitter_active.png";
import happyEmoji from "../../../assets/Icons/Happy_emoji.png";
import { useAuthentication } from '../../../hooks/useAuthentication';

const MainProfile = ({ userData, t, user, onUserInfoChange, friendInfo, userId, isMobile }) => {
  const { followUser, unfollowUser } = useAuthentication();
  const [newBio, setNewBio] = useState(userData.userProfile.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const emojiPickerRef = useRef(null);
  const isOwnProfile = !userId || userId === user.uid;
  const isFollowing = userData?.userProfile?.followers?.includes(user.uid);

  const handleFollowClick = async () => {
    if (isFollowing) {
      await unfollowUser(user.uid, userId);
    } else {
      await followUser(user.uid, userId);
    }
    onUserInfoChange();
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const handleBioSubmit = async () => {
    const db = getFirestore();
    const dailyInfoRef = doc(db, `users/${user.uid}`);

    try {
      await updateDoc(dailyInfoRef, { bio: newBio });
      console.log("Bio updated successfully.");
      userData.userProfile.bio = newBio;
      onUserInfoChange();
      setIsEditing(false);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Error updating Bio:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={isMobile ? styles.mainInfo_mobile : styles.mainInfo}>
      <section className={isMobile ? styles.imgSection_mobile : styles.imgSection}>
        <img src={userData.userProfile.photoURL} className={isMobile ? styles.avatar_mobile : styles.avatar} alt="User Avatar" />
      </section>
      <div className={isMobile ? styles.userInfo_mobile : styles.userInfo}>
        <div className={isMobile ? styles.textInfo_mobile : styles.textInfo}>
          <h3>@{userData.userProfile.displayName}</h3>
          <div className={isMobile ? styles.followInfo_mobile : styles.followInfo}>
            <div className={isMobile ? styles.followCard_mobile : styles.followCard}>
              <p className={styles.title}>{t("following")}:</p>
              <p className={styles.follows}>{userData.userProfile.following?.length || 0}</p>
            </div>
            <div className={isMobile ? styles.followCard_mobile : styles.followCard}>
              <p className={styles.title}>{t("followers")}:</p>
              <p className={styles.follows}>{userData.userProfile.followers?.length || 0}</p>
            </div>
            {!isOwnProfile && (
              <button
                className={`${isMobile ? styles.followButton_mobile : styles.followButton} ${isFollowing ? (isMobile ? styles.following_mobile : styles.following) : ''}`}
                onClick={handleFollowClick}
              >
                {isFollowing ? "Unfollow" : "Follow"}
                {isFollowing ? <FaUserMinus /> : <FaUserPlus />}
              </button>
            )}
          </div>
        </div>
        <div className={isMobile ? styles.bioContainer_mobile : styles.bioContainer}>
          {isEditing ? (
            <div className={isMobile ? styles.editBioContainer_mobile : styles.editBioContainer}>
              <label className={isMobile ? styles.bioLabel_mobile : styles.bioLabel}>
                <p className={styles.bio}>Bio:</p>
                <textarea value={newBio} onChange={handleBioChange} />
              </label>
              <div className={styles.buttonContainer}>
                <button className={`inactiveButton-small ${styles.closeButton}`} onClick={() => setIsEditing(false)}><p>Close</p></button>
                <button className={`button-small ${styles.saveButton}`} onClick={handleBioSubmit}><p>Save</p></button>
              </div>
              {showEmojiPicker && (
                <div className={styles.emojiPickerContainer} ref={emojiPickerRef}>
                  <EmojiPicker onEmojiClick={(emojiObject) => setNewBio(prevBio => prevBio + emojiObject.emoji)} />
                  <button className={styles.closeButton} onClick={() => setShowEmojiPicker(false)}>×</button>
                </div>
              )}
              <button className={styles.emojiButton} onClick={() => setShowEmojiPicker(!showEmojiPicker)}><img src={happyEmoji} alt="Emoji" /></button>
            </div>
          ) : (
            <div className={isMobile ? styles.bioLabel_mobile : styles.bioLabel}>
              <p className={styles.bio}>Bio:</p>
              <div className={isMobile ? styles.viewBioContainer_mobile : styles.viewBioContainer}>
                {userData.userProfile.bio ? (
                  <p>{userData.userProfile.bio}</p>
                ) : (
                  !friendInfo && (
                    <p className={styles.bio}>Write something about yourself!</p>
                  )
                )}
                {!friendInfo && (
                  <button className={styles.editButton} onClick={() => setIsEditing(true)}><FaEdit /></button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={isMobile ? styles.socialMediaContainer_mobile : styles.socialMediaContainer}>
          <div className={isMobile ? styles.socialMedia_mobile : styles.socialMedia}>
            <img src={facebook_inactive} alt='Facebook Icon' />
            <img src={twitter_active} alt='Twitter Icon' />
            <img src={instagram_active} alt='Instagram Icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;