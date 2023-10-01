import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
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
    }

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
        })
        .catch((err) => {
          let error = JSON.stringify(err.response.data , null, 2);
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

    let { email, password } = inputLogin;

    //   axios.post(`https://backendexample.sanbersy.com/api/data-contestant`,
    //    {name: input.name},
    //    {headers: {"Authorization" : "Bearer "+ Cookies.get('token')}}
    // )
    // .then(res => {
    //     ....//logicnya
    // })

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

  //State Global
  let navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    course: "",
    score: 0,
  });
  const [fetchStatus, setfetchStatus] = useState(true);
  // state data
  let [data, setData] = useState(null); //harus memakai state karena react akan merender parameter ini sialisasi terlebih dahulu, disarankan null agar enak pengkondisianya
  // Menginputkan Data kedalam form
  const [curretID, setcurrentID] = useState(-1);

  //Function dan Method Global
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

    // method fetch data menggunakan then catch
    // useEffect(()=>{
    //   axios.get('https://backendexample.sanbercloud.com/api/contestants')
    //   .then((result)=>{
    //     let hasil = result.data //Data API
    //     setData(hasil) //assign data kedalam method setData
    //     // console.log(result.data); // menganmbil hanya datanya saja akan ada array of object dari API
    //     // console.log(result); // menampilkan result dari API berupa object asli APInya
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
    // }, [])

    // console.log(data) // menampilkan data yang sudah di assign kedalam setData
  };

  // Method Handle Inpur
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

  //Membuat Variable untuk semua state dan function
  //Variable Global State
  let state = {
    input,
    setInput,
    fetchStatus,
    setfetchStatus,
    data,
    setData,
    curretID,
    setcurrentID,

    //SIGN IN
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    inputLogin,
    passwordVisible,
    setPasswordVisible,

    //SignUp
    termsAccepted,
    setTermsAccepted,
    inputSignUp,
    setInputSignUp,
    formSubmitted,
    setFormSubmitted,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
  };

  // Variable Global Function
  let handleFunction = {
    fetchData,
    handleInput,
    handleNilai,
    handleSubmit,
    handleDelete,
    handleEdit,
    navigate,

    //SIGN IN
    handleInputLogin,
    handleLogin,
    handleTogglePasswordVisibility,

    //SignUp
    handleAccept,
    handleAcceptClick,
    handleDecelineClick,
    handleInputSignUp,
    handleSignUp,
    handleToggleConfirmPasswordVisibility,
  };

  // Membuat Global Context State
  return (
    //Destructuring
    //mengirimkan state dan function yang akan di gunakan komponen lain
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
