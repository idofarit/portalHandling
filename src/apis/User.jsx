import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../firebaseConfig";
import store from "../redux/Store";
import {
  SetReadNotifications,
  SetUnreadNotifications,
} from "../redux/NotificationSlice";
import { useState } from "react";

export const updateUserProfile = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await updateDoc(doc(fireDB, "users", user.id), payload);
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getUserProfile = async (id) => {
  try {
    const docRef = doc(fireDB, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No user exists",
      };
    }
  } catch (error) {
    return {
      success: true,
      message: "Something went wrong",
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = [];
    const querySnapShot = await getDocs(collection(fireDB, "users"));
    querySnapShot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getUserNotifications = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    // const querySnapshot = await getDocs(
    //   collection(fireDB, "users", user.id, "notifications")
    // );
    // querySnapshot.forEach((doc) => {
    //   notifications.push({ id: doc.id, ...doc.data() });
    // });
    const q = query(collection(fireDB, "users", user.id, "notifications"));
    onSnapshot(q, (querySnapshot) => {
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      const readNotifications = notifications.filter(
        (notification) => notification.status === "read"
      );
      const unreadNotifications = notifications.filter(
        (notification) => notification.status === "unread"
      );
      store.dispatch(SetReadNotifications(readNotifications));
      store.dispatch(SetUnreadNotifications(unreadNotifications));
    });

    return {
      success: true,
      // data: notifications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeNotification = async (id, status) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await updateDoc(doc(fireDB, "users", user.id, "notifications", id), {
      status: status,
    });
    return {
      success: true,
      message: "Notification status changed",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
