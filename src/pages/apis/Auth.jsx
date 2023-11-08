import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import CryptoJS from "crypto-js";

export const LoginUser = async (payload) => {
  // check if user exixts -- start

  try {
    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);
    if (querySnapshot.empty) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      const snapShotData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const user = snapShotData[0];
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        "TRUEjOB"
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedPassword === payload.password) {
        return {
          success: true,
          message: "LogIn successfull",
          data: {
            ...user,
            password: "",
          },
        };
      } else {
        return {
          success: false,
          message: "Invalid password",
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// check if user exixts -- end

export const RegisterUser = async (payload) => {
  try {
    // check email already exists -- start
    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);
    if (querySnapshot.size > 0) {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    // check email already exists -- end

    // password encrypting -- start
    const encryptPassword = CryptoJS.AES.encrypt(
      payload.password,
      "TRUEjOB"
    ).toString();
    payload.password = encryptPassword;
    // password encrypting -- end

    // add user to firestore -- start
    const response = await addDoc(collection(fireDB, "users"), payload);
    return {
      success: true,
      message: "Success! Redirecting to SignIn page",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

// add user to firestore -- end
