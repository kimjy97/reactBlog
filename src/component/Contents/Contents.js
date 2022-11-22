import styles from './Contents.module.scss';

import Main from '../../pages/Main/Main';
import Post from '../../pages/Post/Post';
import SideMenu from './SideMenu/SideMenu';

import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";


const Contents = () => {
    return (
        <div className={styles.Contents}>
            <SideMenu></SideMenu>
            <AnimatePresence>
                <Routes>
                    <Route exact path="/" element={<Main />}></Route>
                    <Route exact path="/post" element={<Post />}></Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default Contents;