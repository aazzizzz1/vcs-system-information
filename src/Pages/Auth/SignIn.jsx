import React, { useContext } from "react";
import SuccessToast from "../../Components/Toast/SuccessToast";
import ErrorToast from "../../Components/Toast/ErrorToast";
import { GlobalContext } from "../../StateManagements/GlobalContext";
import EyeClosedIcon from "../../Assets/EyeClosedIcon";
import EyeOpenIcon from "../../Assets/EyeOpenIcon";
import LogoLen from "../../Assets/LogoLen.png";

const SignIn = () => {
  //Memanggil state dari GlobalContext dan dari destructuring dibawah ini
  const { state, handleFunction } = useContext(GlobalContext);
  //Membuat destructuring dari Global Context
  const {
    inputLogin,
    successMessage,
    errorMessage,
    formSubmitted,
    passwordVisible,
  } = state;

  const { handleInputLogin, handleLogin, handleTogglePasswordVisibility } =
    handleFunction;

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {successMessage && <SuccessToast message={successMessage} />}
          {errorMessage && <ErrorToast message={errorMessage} />}
          <a
            href="a"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-40 h-30 mr-2" src={LogoLen} alt="Logo-Len" border="0" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleLogin}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={inputLogin.email}
                    onChange={handleInputLogin}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                  {formSubmitted && !inputLogin.email && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Images is Required</p>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div
                    className="flex items-center justify-between relative"
                    data-popover-target="popover-password"
                    data-popover-placement="right"
                  >
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={inputLogin.password}
                      onChange={handleInputLogin}
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      required
                    />
                    <span
                      className="absolute inset-y-0 flex items-center right-2 "
                      onClick={handleTogglePasswordVisibility}
                    >
                      {passwordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </span>
                  </div>
                  {formSubmitted && !inputLogin.password && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span class="font-medium">Oh, snapp!</span> Password is
                      Required
                    </p>
                  )}
                  {formSubmitted &&
                    inputLogin.password &&
                    inputLogin.password.length < 8 && (
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span class="font-medium">Oh, snapp!</span> Password
                        must be at least 8 characters
                      </p>
                    )}
                  {formSubmitted &&
                    inputLogin.password &&
                    inputLogin.password.length >= 8 &&
                    !inputLogin.password.match(/[a-z]/g) && (
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span class="font-medium">Oh, snapp!</span> Password
                        must have at least 1 lowercase letter
                      </p>
                    )}
                  {formSubmitted &&
                    inputLogin.password &&
                    inputLogin.password.length >= 8 &&
                    !inputLogin.password.match(/[A-Z]/g) && (
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span class="font-medium">Oh, snapp!</span> Password
                        must have at least 1 uppercase letter
                      </p>
                    )}
                  {formSubmitted &&
                    inputLogin.password &&
                    inputLogin.password.length >= 8 &&
                    !inputLogin.password.match(/[0-9]/g) && (
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span class="font-medium">Oh, snapp!</span> Password
                        must have at least 1 number
                      </p>
                    )}
                  {formSubmitted &&
                    inputLogin.password &&
                    inputLogin.password.length >= 8 &&
                    !inputLogin.password.match(/[^a-zA-Z\d]/g) && (
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span class="font-medium">Oh, snapp!</span> Password
                        must have at least 1 symbol
                      </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  {/* <a
                    href="a"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </a> */}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popover */}
      <div
        data-popover=""
        id="popover-password"
        role="tooltip"
        className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
      >
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Must have at least 8 characters
          </h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1 bg-orange-300 dark:bg-orange-400" />
            <div className="h-1 bg-orange-300 dark:bg-orange-400" />
            <div className="h-1 bg-gray-200 dark:bg-gray-600" />
            <div className="h-1 bg-gray-200 dark:bg-gray-600" />
          </div>
          <p>It’s better to have:</p>
          <ul>
            <li className="flex items-center mb-1">
              <svg
                className="w-3.5 h-3.5 mr-2 text-green-400 dark:text-green-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              Upper &amp; lower case letters
            </li>
            <li className="flex items-center mb-1">
              <svg
                className="w-3.5 h-3.5 mr-2 text-green-400 dark:text-green-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              Must have at least 1 number
            </li>
            <li className="flex items-center mb-1">
              <svg
                className="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              Must have at least 1 symbol (#$&amp;)
            </li>
            <li className="flex items-center">
              <svg
                className="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              password cannot be the same as username
            </li>
          </ul>
        </div>
        <div data-popper-arrow="" />
      </div>
    </>
  );
};

export default SignIn;
