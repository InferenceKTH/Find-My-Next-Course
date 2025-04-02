import React, { useState, useEffect } from 'react';
import { model } from '../model.js';
import kth_logo from '../assets/kth_logo.png';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

function SearchbarView(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, [auth]);

    const handleSearch = () => {
        const results = model.courses.filter(course =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(results);
    };

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <div className="w-full px-6 py-6 bg-[#000061] flex items-center justify-between">
            <a href="https://www.kth.se" className="flex items-center h-[90px] w-auto">
                <img
                    src={kth_logo}
                    className="h-[90px] w-auto"
                    alt="KTH Logo"
                />
            </a>

            <input
                type="text"
                placeholder="What course are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-[400px] h-[44px] pl-14 pr-4 bg-white text-black rounded-full"
            />

            <div className="flex gap-4">
                <button
                    className="w-[100px] h-[44px] bg-white text-black rounded-full text-center border border-solid cursor-pointer hover:bg-[#000061] hover:text-white"
                    onClick={() => window.location.href = "https://inferencekth.github.io/Find-My-Next-Course/"}>
                    About us
                </button>

                <div className="w-[100px] h-[44px] bg-white text-black rounded-full text-center border border-solid cursor-pointer hover:bg-[#000061] hover:text-white flex items-center justify-center">
                    {user ? (
                        <div className="flex items-center">
                            <img src={user.photoURL} alt="Profile" className="h-6 w-6 rounded-full mr-2" />
                            <button onClick={handleSignOut} className="flex items-center justify-center w-full h-full">
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleSignIn} className="flex items-center justify-center w-full h-full">
                            Sign in with Google
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchbarView;