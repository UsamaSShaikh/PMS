import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      student_id: newUser.student_id,
      password: newUser.password
    })
    .then(res => {
      // console.log("Registered");
      // console.log(res);
      return res;
    })
    .catch(err => {
      // console.log("Erroring Register");
      // console.log(err.response);
      return err.response;
    });
};

export const login = user => {
  return axios
    .post(
      "users/login",
      {
        student_id: user.student_id,
        password: user.password
      },
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      // console.log("Correct");
      localStorage.setItem("usertoken", res.data);
      return res;
    })
    .catch(err => {
      // console.log("Erroring");
      // console.log(err.response);
      return err.response;
    });
};

export const getStudentAcamedics = student_id => {
  // console.log("getStudentAcamedics : " + student_id);
  return axios
    .post("users/studentAcademics", {
      student_id: student_id
    })
    .then(res => {
      // console.log("User Functions Academics");
      // console.log(res);
      //localStorage.setItem("studentToken", res.data);
      return res;
    })
    .catch(err => {
      // console.log("User Functions");
      // console.log(err);
    });
};

export const getStudentMarks = user => {
  // console.log("getStudentMarks : " + user.student_id);
  return axios
    .post("users/studentMarks", {
      student_id: user.student_id /*,
      academics: user.academics*/
    })
    .then(res => {
      // console.log("User Functions Marks");
      // console.log(res);
      return res;
    })
    .catch(err => {
      // console.log("User Functions");
      // console.log(err);
    });
};

export const getMarks = user => {
  return axios
    .post(
      "users/marks",
      {
        student_id: user.student_id,
        year: user.year,
        subject: user.subject
      },
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSubject = () => {
  return axios
    .post("users/subject")
    .then(res => {
      // console.log("U.F. getSubject success");
      return res;
    })
    .catch(err => {
      console.log("U.F. getSubject Error");
      console.log(err);
    });
};
