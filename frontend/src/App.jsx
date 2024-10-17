import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Subscription from './components/Subscription';
import Register from './components/Register';
import News from "./components/News";

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('business');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const categories = ['business', 'entertainment', 'health', 'science', 'sports'];

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setIsAuthenticated(true); 
        }
    }, [isAuthenticated]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setDropdownOpen(false); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <header className='py-3 px-10 bg-slate-300 flex justify-between items-center'>
                <h1 className="text-4xl font-bold">News Application</h1>
                <div className='relative'>
                    <div className='w-10 h-10 bg-white rounded-full cursor-pointer shadow-sm' onClick={() => setDropdownOpen(!isDropdownOpen)}>
                        <span className='w-full h-full p-2 block'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-full h-full' viewBox="0 0 50 50">
                                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                        </svg>
                        </span>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-fit bg-white shadow-lg rounded z-10 flex flex-col items-start">
                            {isAuthenticated ? (
                                <>
                                    <button className='px-5 py-1 border-b' onClick={handleLogout}>Logout</button>
                                    <button className='px-5 py-1'>Profile</button>
                                </>
                            ) : (
                                <>
                                    <button className='px-5 py-1 border-b' onClick={() => window.location.href = '/login'}>Login</button>
                                    <button className='px-5 py-1' onClick={() => window.location.href = '/register'}>Register</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <div className="container mx-auto p-5">
                <Routes>
                    <Route
                        path="/"
                        element={isAuthenticated ? (
                            <>
                                <Subscription />
                                <div className="mt-6">
                                    <div className="flex space-x-4 border-b">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                className={`pb-2 px-4 font-semibold ${selectedCategory === category ? 'border-b-2 border-blue-600' : ''}`}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                    <News category={selectedCategory} />
                                </div>
                            </>
                        ) : (
                            <Navigate to="/login" />
                        )}
                    />
                    <Route path="/login" element={<Login isAuth={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
