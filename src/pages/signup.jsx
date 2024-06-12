
import singupImage from '../assets/signupImage.jpg';
import { NavLink } from 'react-router-dom';
import loginVector from '../assets/login.png'
import homeVector from '../assets/home.png'
import { useState } from 'react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Signing up with', { email, password });
    };

    return (
        <div className="loginPage w-full h-[100vh] flex items-center justify-center">
            <div className="loginContainer w-[70vw] h-[70vh] bg-main rounded-lg flex relative">
                <div className='loginInfo w-1/2 p-4'>
                    <form className='loginInfoForm w-full h-[100%] flex flex-col justify-around items-center ' onSubmit={handleSubmit}>
                        <h1 className='text-3xl overflow-hidden text-secondary capitalize'>welcome back!</h1>
                        <div className='w-full flex items-center justify-between'>
                            <label className='text-2xl text-secondary'>Email</label>
                            <input
                                className='w-2/3 focus:outline-none text-xl text-secondary caret-secondary bg-transparent border-b-2 border-b-secondary'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <label className='text-2xl text-secondary'>Password</label>
                            <input
                                className='w-2/3 focus:outline-none text-xl text-secondary caret-secondary bg-transparent border-b-2 border-b-secondary'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <label className='text-xl text-secondary'>Password X2</label>
                            <input
                                className='w-2/3 focus:outline-none text-xl text-secondary caret-secondary bg-transparent border-b-2 border-b-secondary'
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='text-md text-secondary font-thin'><NavLink className='font-light' to={'/login'}>log in</NavLink> if you have an account.</div>
                        <button className='bg-secondary p-2 rounded-lg text-xl text-main' type="submit">Submit</button>
                    </form>
                </div>
                <img src={singupImage} alt='loginImage' className="loginImage w-1/2 object-cover object-center" />
            </div>
            <div className="redirectionLinks absolute w-1/3 h-12 left-1/2 bottom-4 translate-x-[-50%] flex gap-6 items-center justify-center">
                <NavLink to={'/login'} className='flex items-center justify-center w-12 h-12 border-main border-2 bg-secondary rounded-[50%]'><img className='w-[70%]' src={loginVector} alt="signupImage" /></NavLink>
                <NavLink to={'/'} className='flex items-center justify-center w-12 h-12 border-main border-2 bg-secondary rounded-[50%]'><img className='w-[70%]' src={homeVector} alt="homeImage" /></NavLink>
            </div>
        </div>
    );
}
