import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../Firebase Configation/firebase.config';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';

const Signup = () => {
    const [show , setShow] = useState(false)

    const singUpWithEmail = (e) =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        setShow(false)
        console.log("got sing up request", {email , password});
        if(password.length < 8){
            toast.error("Password Should be atlest 8 Letter")
            return;
        } 

        const passwordPetternUppercase = /^(?=.*[A-Z]).+$/
        if(!passwordPetternUppercase.test(password)){
            toast.error("Password Should have atlest 1 Capital letter digit")
            return;
        }
        const passwordPetternLowercase = /^(?=.*[a-z]).+$/
        if(!passwordPetternLowercase.test(password)){
            toast.error("Password Should have atlest 1 Small letter digit")
            return;
        } 

        const passwordPetternSpecialCharecter = /^(?=.*[!@#$%^&*()_\-+=[{\]};:'",<.>/?\\|`~]).+$/
        if(!passwordPetternSpecialCharecter.test(password)){
            toast.error("Password Should have atlest 1 Special Charecter ")
            return;
        }

         const passwordPetternDigit = /^^(?=.*\d).+$/
        if(!passwordPetternDigit.test(password)){
            toast.error("Password Should have atlest 1 Number")
            return;
        }
        
        createUserWithEmailAndPassword(auth,email, password)
        .then((result) => {
            console.log(result.user)
            toast.success("Account Succesfully Created")
        })
        .catch(e =>{
            // toast.error(error.message)
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
        })
    }
    return (
        <form onSubmit={singUpWithEmail} className='flex justify-center items-center'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sing Up</legend>

                <div>
                <label className="label">Email</label>
                <input type="email" className="input" name='email' placeholder="Email" />
                </div>

                <div className='relative'>
                <label className="label">Password</label>
                <input type={show? "text" : "password" } className="input" name='password' placeholder="Password" />
                <span className='absolute top-[32px] right-1' onClick={() => setShow(!show)}> {show? <FaEyeSlash></FaEyeSlash>: <IoEyeOutline></IoEyeOutline>}</span>
                </div>

                <button className="btn btn-neutral mt-4">Sing Up</button>
                <p>Already have an Account? <Link to={"/signin"} className='text-blue-700 underline'> Sign In</Link></p>
            </fieldset>
        </form>
    );
};

export default Signup;