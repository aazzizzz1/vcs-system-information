import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  //State Global
  let navigate = useNavigate();

  //SIGN UP
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleAccept = () => {
    setTermsAccepted(!termsAccepted); // Toggle the value true
  };

  const handleAcceptClick = () => {
    setTermsAccepted(true);
  };

  const handleDecelineClick = () => {
    setTermsAccepted(false);
  };

  const [inputSignUp, setInputSignUp] = useState({
    name: "",
    img_url: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputSignUp = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setInputSignUp({ ...inputSignUp, [name]: value });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set formSubmitted to true when the form is submitted

    let { name, img_url, email, password, confirm_password } = inputSignUp;

    // Validation check: if any of the fields are empty, show an alert
    if (!name || !img_url || !email || !password || !confirm_password) {
      setErrorMessage("All fields are required. Please fill out all fields."); // Set error message
      setSuccessMessage(""); // Clear success message
      return;
    }

    // Validation check: if passwords do not match, show an alert
    if (password !== confirm_password) {
      setErrorMessage("Passwords do not match. Please check your password."); // Set error message
      setSuccessMessage(""); // Clear success message
      return;
    }

    // Validation check: if password is the same as the name, show an alert
    if (password === name) {
      setErrorMessage("Password cannot be the same as your name."); // Set error message
      setSuccessMessage(""); // Clear success message
      return;
    }

    axios
      .post("https://dev-example.sanbercloud.com/api/register", {
        name,
        img_url,
        email,
        password,
        confirm_password,
      })
      .then((res) => {
        let data = res.data;
        console.log(data);
        setSuccessMessage("Registrasi successful!"); // Set success message
        setErrorMessage(""); // Clear error message
        window.location.href = "/signin";
        // navigate(`/signin`)
      })
      .catch((err) => {
        let error = JSON.stringify(err.response.data, null, 2);
        console.log(err);
        setErrorMessage(error); // Set error message
        setSuccessMessage(""); // Clear success message
      });
  };

  //SIGN IN
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputLogin = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set formSubmitted to true when the form is submitted

    let { email, password } = inputLogin;

    //   axios.post(`https://backendexample.sanbersy.com/api/data-contestant`,
    //    {name: input.name},
    //    {headers: {"Authorization" : "Bearer "+ Cookies.get('token')}}
    // )
    // .then(res => {
    //     ....//logicnya
    // })

    // Validation check: if password is the same as the name, show an alert
    if (password === email) {
      setErrorMessage("Password cannot be the same as your name."); // Set error message
      setSuccessMessage(""); // Clear success message
      return;
    }

    axios
      .post(`https://dev-example.sanbercloud.com/api/login`, {
        email,
        password,
      })
      .then((res) => {
        // console.log(res)
        let data = res.data;
        Cookies.set(`token`, data.token, { expires: 1 });
        setSuccessMessage("Login successful!"); // Set success message
        setErrorMessage(""); // Clear error message
        window.location.href = "/"; // Redirect to the root URL
        // navigate(`/`)
      })
      .catch((err) => {
        // stringify error to string and show it on alert
        let error = JSON.stringify(err.message, null, 2);
        console.log(err);
        setErrorMessage(error); // Set error message
        setSuccessMessage(""); // Clear success message
      });
  };

  const [fetchStatus, setfetchStatus] = useState(true);

  // state data
  let [data, setData] = useState(null); //harus memakai state karena react akan merender parameter ini sialisasi terlebih dahulu, disarankan null agar enak pengkondisianya

  // Menginputkan Data kedalam form
  const [curretID, setcurrentID] = useState(-1);

  //Function Fetch Data
  let fetchData = () => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://backendexample.sanbercloud.com/api/student-scores"
        );
        let hasil = result.data; // Data API
        setData([...hasil]); // assign data ke dalam method setData Bisa menggunakan SPREAD OPERATOR atau tidak
        // console.log(result.data); // mengambil hanya datanya saja akan ada array of object dari API
        // console.log(result); // menampilkan result dari API berupa object asli APInya
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setfetchStatus(false);
    console.log(data) // menampilkan data yang sudah di assign kedalam setData
  };

  //Fatch Data Dashboard
  const [input, setInput] = useState({
    name: "",
    course: "",
    score: 0,
  });

  // Method Handle Input
  const handleInput = (events) => {
    let value = events.target.value;
    let name = events.target.name;

    // console.log(`${name}, ${score}, ${course}, ${value}`)

    if (name === "name") {
      setInput({ ...input, name: value });
    } else if (name === "course") {
      setInput({ ...input, course: value });
    } else if (name === "score") {
      setInput({ ...input, score: value });
    }
  };
  //Method Mengganti Nilai
  let handleNilai = (nilai) => {
    if (nilai >= 80) {
      return "A";
    } else if (nilai >= 70 && nilai < 80) {
      return "B";
    } else if (nilai >= 60 && nilai < 70) {
      return "C";
    } else if (nilai >= 50 && nilai < 60) {
      return "D";
    } else {
      return "E";
    }
  };

  // Submit Form Create
  const handleSubmit = (events) => {
    events.preventDefault();

    const { name, course, score } = input;
    if (curretID === -1) {
      axios
        .post("https://backendexample.sanbercloud.com/api/student-scores", {
          name,
          course,
          score,
        })
        .then((result) => {
          console.log(result);
          setfetchStatus(true);
          navigate("/");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbercloud.com/api/student-scores/${curretID}`,
          {
            name,
            course,
            score,
          }
        )
        .then((result) => {
          console.log(result);
          setfetchStatus(true);
        })
        .catch((error) => {
          alert(error);
        });
    }

    //balikan lagi agar tidak bug agar bisa create data
    setcurrentID(-1);

    //balikin input ke deafault
    setInput({
      name: "",
      course: "",
      score: 0,
    });
  };

  //Delete Data by ID
  let handleDelete = (e, userId) => {
    e.preventDefault();
    axios
      .delete(
        `https://backendexample.sanbercloud.com/api/student-scores/${userId}`
      )
      .then((result) => {
        // console.log(result)
        setfetchStatus(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  //Menampilkan Data Kedalam Form
  let handleEdit = (e, userId) => {
    setcurrentID(userId);

    e.preventDefault();
    axios
      .get(
        `https://backendexample.sanbercloud.com/api/student-scores/${userId}`
      )
      .then((res) => {
        let reslutedit = res.data;
        // console.log(reslutedit)
        setInput({
          name: reslutedit.name,
          course: reslutedit.course,
          score: reslutedit.score,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // PAGES TUGAS
  //Kanban
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let fetchJobs = () => {
    const fetchJobs = async (page) => {
      try {
        const response = await axios.get(
          `https://dev-example.sanbercloud.com/api/job-vacancy?page=${page}`
        );
        let data = response.data;
        setJobs(data.data);
        setTotalPages(data.last_page);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchJobs(currentPage);
    setfetchStatus(false);
    console.log(jobs);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Final Project
  let fetchDataFinalProject = () => {
    const fetchDataFinalProject = async () => {
      try {
        const result = await axios.get(
          "https://dev-example.sanbercloud.com/api/job-vacancy"
        );
        let hasil = result.data; // Data API
        console.log(hasil.data);
        setData([...hasil.data]);
        // assign data ke dalam method setData Bisa menggunakan SPREAD OPERATOR atau tidak
        // console.log(result.data); // mengambil hanya datanya saja akan ada array of object dari API
        // console.log(result); // menampilkan result dari API berupa object asli APInya
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataFinalProject();
    setfetchStatus(false);
    // console.log(data) // menampilkan data yang sudah di assign kedalam setData
  };

  function batasiKata(dasar, jumlahKata) {
    // Check if dasar is null or undefined
    if (dasar === null || dasar === undefined) {
        return 'Invalid input'; // Or any appropriate default value or error message
    }

    // Mengubah string menjadi array kata
    let kata = dasar.split(' ');

    // Memeriksa apakah jumlah kata melebihi batas yang ditentukan
    if (kata.length > jumlahKata) {
        // Mengambil hanya sejumlah kata yang diinginkan
        kata = kata.slice(0, jumlahKata);

        // Menggabungkan kembali array kata menjadi string dan menambahkan titik-titik
        let hasil = kata.join(' ') + '...';
        return hasil;
    }

    // Jika jumlah kata dalam string tidak melebihi batas, mengembalikan string asli
    return dasar;
}


  // Create Data Tugas
  const [inputFinalProject, setInputFinalProject] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: 0,
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: 0,
    salary_max: 0,
  });

  const handleInputFinalProject = (events) => {
    let value = events.target.value;
    let name = events.target.name;
    // console.log(`${name}, ${score}, ${course}, ${value}`)

    if (name === "title") {
      setInputFinalProject({ ...inputFinalProject, title: value });
    } else if (name === "job_description") {
      setInputFinalProject({ ...inputFinalProject, job_description: value });
    } else if (name === "job_qualification") {
      setInputFinalProject({ ...inputFinalProject, job_qualification: value });
    } else if (name === "job_type") {
      setInputFinalProject({ ...inputFinalProject, job_type: value });
    } else if (name === "job_tenure") {
      setInputFinalProject({ ...inputFinalProject, job_tenure: value });
    } else if (name === "job_status") {
      setInputFinalProject({ ...inputFinalProject, job_status: value });
    } else if (name === "company_name") {
      setInputFinalProject({ ...inputFinalProject, company_name: value });
    } else if (name === "company_image_url") {
      setInputFinalProject({ ...inputFinalProject, company_image_url: value });
    } else if (name === "company_city") {
      setInputFinalProject({ ...inputFinalProject, company_city: value });
    } else if (name === "salary_min") {
      setInputFinalProject({ ...inputFinalProject, salary_min: value });
    } else if (name === "salary_max") {
      setInputFinalProject({ ...inputFinalProject, salary_max: value });
    }
  };

  // Create Data Function
  const handleCreateDataFinalProject = (events) => {
    events.preventDefault();
    const {
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = inputFinalProject;
    const token = Cookies.get("token"); // Mengambil token dari Cookies

    // Menambahkan token ke header permintaan
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        "https://dev-example.sanbercloud.com/api/job-vacancy",
        {
          title,
          job_description,
          job_qualification,
          job_type,
          job_tenure,
          job_status,
          company_name,
          company_image_url,
          company_city,
          salary_min,
          salary_max,
        },
        { headers }
      ) // Menambahkan headers ke permintaan
      .then((result) => {
        console.log(result);
        setfetchStatus(true);
        // window.location.href = "/kanban";
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    // Reset input to default values
    setInputFinalProject({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: 0,
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: 0,
      salary_max: 0,
    });
  };

  // Edit Data Function
  const handleEditDataFinalProject = (events, id) => {
    events.preventDefault();
    const {
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = inputFinalProject;
    const token = Cookies.get("token"); // Mengambil token dari Cookies
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .put(
        `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`,
        {
          title,
          job_description,
          job_qualification,
          job_type,
          job_tenure,
          job_status,
          company_name,
          company_image_url,
          company_city,
          salary_min,
          salary_max,
        },
        { headers }
      )
      .then((result) => {
        console.log(result);
        setfetchStatus(true);
      })
      .catch((error) => {
        alert(error);
      });

    // Reset input to default values
    setInput({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: 0,
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: 0,
      salary_max: 0,
    });
  };

  //Membuat Variable untuk semua state dan function
  //Variable Global State
  let state = {
    //SignUp
    termsAccepted,
    setTermsAccepted,
    inputSignUp,
    setInputSignUp,
    formSubmitted,
    setFormSubmitted,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    //SIGN IN
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    inputLogin,
    passwordVisible,
    setPasswordVisible,
    //Data Dashboard
    input,
    setInput,
    fetchStatus,
    setfetchStatus,
    data,
    setData,
    curretID,
    setcurrentID,
    //Final Project
    inputFinalProject,
    setInputFinalProject,
    //Kanban
    jobs,
    currentPage,
    totalPages,
  };

  // Variable Global Function
  let handleFunction = {
    //SignUp
    handleAccept,
    handleAcceptClick,
    handleDecelineClick,
    handleInputSignUp,
    handleSignUp,
    handleToggleConfirmPasswordVisibility,
    //SIGN IN
    handleInputLogin,
    handleLogin,
    handleTogglePasswordVisibility,
    //Data Dashboard
    fetchData,
    handleInput,
    handleNilai,
    handleSubmit,
    handleDelete,
    handleEdit,
    navigate,
    //Final Project
    fetchDataFinalProject,
    batasiKata,
    handleInputFinalProject,
    handleCreateDataFinalProject,
    handleEditDataFinalProject,
    //Kanban
    fetchJobs,
    handlePageChange,
  };
  // Membuat Global Context State
  return (
    //Destructuring mengirimkan state dan function yang akan di gunakan komponen lain
    <GlobalContext.Provider
      value={{
        state,
        handleFunction,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};