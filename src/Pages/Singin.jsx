import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { FaEyeSlash, FaGithub } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../Firebase Configation/firebase.config";
import MyContainer from "../Components/MyContainer";

const Singin = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const googleProvide = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider()

  const loginWithEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setShow(false);

    if (password.length < 8) {
      toast.error("Password Should be atlest 8 Letter");
      return;
    }

    const passwordPetternUppercase = /^(?=.*[A-Z]).+$/;
    if (!passwordPetternUppercase.test(password)) {
      toast.error("Password Should have atlest 1 Capital letter digit");
      return;
    }
    const passwordPetternLowercase = /^(?=.*[a-z]).+$/;
    if (!passwordPetternLowercase.test(password)) {
      toast.error("Password Should have atlest 1 Small letter digit");
      return;
    }

    const passwordPetternSpecialCharecter =
      /^(?=.*[!@#$%^&*()_\-+=[{\]};:'",<.>/?\\|`~]).+$/;
    if (!passwordPetternSpecialCharecter.test(password)) {
      toast.error("Password Should have atlest 1 Special Charecter ");
      return;
    }

    const passwordPetternDigit = /^^(?=.*\d).+$/;
    if (!passwordPetternDigit.test(password)) {
      toast.error("Password Should have atlest 1 Number");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        console.log("this is from setUser", user);
        toast.success("Login Succesfull");
      })
      .catch((e) => {
        toast.error(e.code);

        if (e.code === "auth/email-already-in-use") {
          toast.error("⚠️ এই ইমেইলটি আগেই ব্যবহার করা হয়েছে। অন্য ইমেইল দিন।");
        } else if (e.code === "auth/invalid-email") {
          toast.error("❌ দয়া করে একটি বৈধ ইমেইল দিন।");
        } else if (e.code === "auth/weak-password") {
          toast.error("🔒 পাসওয়ার্ড অন্তত ৮ অক্ষরের এবং শক্তিশালী হতে হবে।");
        } else if (e.code === "auth/missing-password") {
          toast.error("⚠️ পাসওয়ার্ড ফিল্ড খালি রাখা যাবে না।");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("🌐 ইন্টারনেট সংযোগ পরীক্ষা করুন।");
        } else if (e.code === "auth/internal-error") {
          toast.error("❗ সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পরে চেষ্টা করুন।");
        } else {
          toast.error("❗ কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
        }
      });
  };
  const singInWithGoogle = () => {
    signInWithPopup(auth, googleProvide)
      .then((res) => {
        console.log(res.user);
        setUser(res.user);
        toast.success("Singed In via Google");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const singInWithGithub = () =>{
    signInWithPopup(auth, githubProvider)
    .then((res) => {
        console.log(res.user);
        setUser(res.user);
        toast.success("Singed In via Github");
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed Out");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <MyContainer className=" flex justify-center items-center">
        {user ? (
          <div className="bg-blue-700 text-white font-bold w-1/4 p-8 rounded-2xl flex flex-col gap-5 justify-center items-center">
            <figure>
              {" "}
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1760592150404-adacb88548e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735"
                }
                className="h-20 w-20 rounded-full mx-auto"
                alt=""
              />
            </figure>
            <h1> {user.email}</h1>
            <h2> {user?.displayName || "No display Name"}</h2>
            <button onClick={handleSignOut} className="btn">
              {" "}
              Sign Out
            </button>
          </div>
        ) : (
          <form
            onSubmit={loginWithEmail}
            className="flex justify-center items-center"
          >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Sing In</legend>

              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />

              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <span
                  className="absolute top-[32px] right-1"
                  onClick={() => setShow(!show)}
                >
                  {" "}
                  {show ? (
                    <FaEyeSlash></FaEyeSlash>
                  ) : (
                    <IoEyeOutline></IoEyeOutline>
                  )}
                </span>
              </div>

              <button className="btn btn-neutral mt-4">Sing In</button>
              <div className="flex justify-center items-center  gap-2.5 my-2">
                <div className="h-px w-16 bg-blue-600"> </div>
                <span className="text-sm text-blue-800 font-semibold"> Or</span>
                <div className="h-px w-16 bg-blue-600"> </div>
              </div>
              <button
                onClick={singInWithGoogle}
                type="button"
                className="btn bg-white text-black border-[#e5e5e5] mb-4"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <button 
                onClick={singInWithGithub}
                type="button"
                className="btn bg-white text-black border-[#e5e5e5] mb-4"
              >
                {/* <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg> */}
                <FaGithub></FaGithub> Login with Github
              </button>
              
              
              <p className="flex justify-center items-center gap-3">
                New to Our Website?{" "}
                <Link to={"/signup"} className="text-blue-700 underline">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </fieldset>
          </form>
        )}
      </MyContainer>
    </>
  );
};

export default Singin;
