import React from "react";
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import Home from "./components/Home/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import UserProfile from "./components/UserProfile/UserProfile";
import { ChakraProvider } from '@chakra-ui/react';
const LazyAsk = React.lazy(() => import('./components/Ask/Ask'));
const LazyRegister = React.lazy(() => import('./components/Register/Register'));
const LazyLogin = React.lazy(() => import('./components/Login/Login'));

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState(() => {
    // Retrieve the user data from storage or set it to null if not found
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleSetSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <ChakraProvider>
        <UserContext.Provider value={{ user, updateUser }}>
          <BrowserRouter>
            <main>
              <Routes>
                <Route 
                  path="/register" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyRegister />
                    </Suspense>
                  }
                />
                <Route 
                  path="/login" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyLogin />
                    </Suspense>
                  } 
                />
                <Route path="/home" element={<Home handleSetSearchQuery={handleSetSearchQuery} />} />
                <Route path="/search" element={<SearchResults searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />} />
                <Route 
                  path="/ask" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyAsk handleSetSearchQuery={handleSetSearchQuery} />
                    </Suspense>
                  } />
                <Route path="/question/:id" element={<QuestionDetails handleSetSearchQuery={handleSetSearchQuery} />} />
                <Route path="/user/:id" element={<UserProfile handleSetSearchQuery={handleSetSearchQuery} />} />
              </Routes>
            </main>
          </BrowserRouter>
        </UserContext.Provider>
      </ChakraProvider>
    </div>
  );
}