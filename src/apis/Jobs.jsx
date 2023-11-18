import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { fireDB } from "../firebaseConfig";
import moment from "moment/moment";

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await addDoc(collection(fireDB, "jobs"), {
      ...payload,

      status: "pending",
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:MM A"),
    });

    // send notification to admin
    await addDoc(collection(fireDB, "users", "admin", "notifications"), {
      title: `New Job post Request from ${user.name}`,
      onclick: `/admin/jobs`,
      createdAt: moment().format("DD-MM-YYYY HH:MM A"),
      status: "unread",
    });
    return {
      success: true,
      message: "Job posted successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getPostedJobByUserId = async (userId) => {
  try {
    const jobs = [];
    const querySnapshot = await getDocs(collection(fireDB, "jobs"));
    querySnapshot.forEach((doc) => {
      if (doc.data().postedByUserId === userId) {
        jobs.push({ id: doc.id, ...doc.data() });
      }
    });
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getJobById = async (id) => {
  try {
    const docRef = doc(fireDB, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No jobs found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getallJobs = async (filters) => {
  try {
    let whereConditions = [];
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          whereConditions.push(where(key, "==", filters[key]));
        }
      });
    }

    const jobs = [];
    const qry = query(
      collection(fireDB, "jobs"),
      ...whereConditions
      // orderBy("postedOn", "desc")
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    const sortedJobPosts = jobs.sort((a, b) => {
      return moment(b.postedOn, "DD-MM-YYYY HH:MM a").diff(
        moment(a.postedOn, "DD-MM-YYYY HH:MM a")
      );
    });
    return {
      success: true,
      data: sortedJobPosts,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const editJobDetails = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:MM A"),
    });
    return {
      success: true,
      message: "Job Updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeJobStatusFromAdmin = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:MM A"),
    });
    // send notification to user
    await addDoc(
      collection(fireDB, "users", payload.postedByUserId, "notifications"),
      {
        title: `Your job request for ${payload.title} has been ${payload.status}`,
        onclick: `/postedJobs`,
        createdAt: moment().format("DD-MM-YYYY HH:MM A"),
        status: "unread",
      }
    );
    return {
      success: true,
      message: "Job Updated successfully",
    };
  } catch (error) {}
};

export const deleteJobById = async (id) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", id));
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const applyJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const job = payload;
  console.log(job);
  try {
    await addDoc(collection(fireDB, "applications"), {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userName: user.name,
      userId: user.id,
      email: user.email,
      appliedOn: moment().format("DD-MM-YYYY HH:MM A"),
      status: "pending",
    });

    return {
      success: true,
      message: "Job Applied successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const getApplicationByJobId = async (jobId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getApplicationByUserId = async (userId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications = [];
    const qry = query(collection(fireDB, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeApplicationStatus = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "applications", payload.id), {
      status: payload.status,
    });
    // send notification to user
    await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
      title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
      onclick: `/appliedJobs`,
      status: "unread",
      createdAt: moment().format("DD-MM-YYYY HH:MM A"),
    });
    return {
      success: true,
      message: "Application stats updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
