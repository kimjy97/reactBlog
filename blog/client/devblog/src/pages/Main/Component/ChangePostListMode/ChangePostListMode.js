import { useRef, useEffect } from 'react';
import styles from './ChangePostListMode.module.scss';

function ChangePostListMode(props) {
    const targetRef = useRef();
    const targetRef2 = useRef([]);

    // 모드 초기값 설정 //
    useEffect(() => {
        changeClick(props.initMode);
    }, [props.initMode]);


    const changeClick = (mode) => {
        targetRef2.current.map(tg => tg.style.filter = 'invert(65%)');
        if (mode === 1) {
            targetRef.current.style.left = '0';
            targetRef2.current[mode].style.filter = 'invert(100%)';
        }
        if (mode === 2) {
            targetRef.current.style.left = '35px';
            targetRef2.current[mode].style.filter = 'invert(100%)';
        }
        if (mode === 3) {
            targetRef.current.style.left = '70px';
            targetRef2.current[mode].style.filter = 'invert(100%)';
        }
        props.changeViewMode(mode);
    }
    
    return (
        <div className={styles.ChangePostListMode}>
            <div className={styles.ChangePostListMode_container}>
                <div className={styles.modeEffect} ref={targetRef}></div>
                <div className={`${styles.mode} ${styles.mode1}`} ref={elem => (targetRef2.current[1] = elem)} onClick={() => { changeClick(1); }}></div>
                <div className={`${styles.mode} ${styles.mode2}`} ref={elem => (targetRef2.current[2] = elem)} onClick={() => { changeClick(2); }}></div>
                <div className={`${styles.mode} ${styles.mode3}`} ref={elem => (targetRef2.current[3] = elem)} onClick={() => { changeClick(3); }}></div>
            </div>
        </div>
    )
}

export default ChangePostListMode;