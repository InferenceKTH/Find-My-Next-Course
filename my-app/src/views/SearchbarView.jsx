import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import project_logo from '../assets/project_icon.png';
import FavouritesDropdown from './Components/FavouriteDropdown.jsx';

function SearchbarView(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [showFavourites, setShowFavourites] = useState(false);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        props.searchCourses(query);
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
        <div className="w-full px-6 py-6 bg-[#000061] flex items-center justify-between relative">
            <a href="https://www.kth.se" className="flex items-center h-[90px] w-auto">
                <img
                    src={project_logo}
                    className="h-[90px] w-auto"
                    alt="KTH Logo"
                />
            </a>

            <input
                type="text"
                placeholder="What course are you looking for?"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-[400px] h-[44px] pl-14 pr-4 bg-white text-black rounded-full"
            />

            <div className="flex gap-6 items-center">
                <button
                    className="w-[120px] h-[44px] bg-[#003399] text-white rounded-full border border-[#000061] cursor-pointer hover:bg-[#001a4d] transition-all duration-200"
                    onClick={() => window.location.href = "https://inferencekth.github.io/Find-My-Next-Course/"}>
                    About us
                </button>

                <div className="relative">
                    <button onClick={() => setShowFavourites(!showFavourites)}
                            className="w-[120px] h-[44px] bg-[#003399] text-white rounded-full border border-[#000061] cursor-pointer hover:bg-[#001a4d] transition-all duration-200">
                        Favourites
                    </button>
                    {showFavourites && (
                        <FavouritesDropdown
                            courses={props.courses}
                            favouriteCourses={props.favouriteCourses}
                            removeFavourite={props.removeFavourite}
                        />
                    )}
                </div>

                <div className="flex items-center cursor-pointer">
                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className="w-[120px] h-[44px] bg-[#003399] text-white rounded-full border border-[#000061] cursor-pointer hover:bg-[#001a4d] transition-all duration-200">
                            Sign out
                        </button>
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className="w-auto min-w-[120px] h-[44px] bg-[#003399] text-white text-sm rounded-full border border-[#001a4d] cursor-pointer hover:bg-[#001a4d] transition-all duration-200 flex items-center justify-center px-4">
                            Sign in with Google
                        </button>
                    )}
                </div>

                {user && (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-[44px] h-[44px] rounded-full border border-[#000061]"
                    />
                )}
            </div>
        </div>
    );
}

export default SearchbarView;