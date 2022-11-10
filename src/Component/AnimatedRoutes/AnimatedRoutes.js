import React from "react";
import Main from '../../pages/Main/Main';
import Contents from '../../pages/Contents/Contents';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";


function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Main />}></Route>
                <Route exact path="/:no" element={<Contents />}></Route>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;