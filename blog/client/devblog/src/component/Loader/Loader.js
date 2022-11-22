import styles from './Loader.module.scss';

import { useEffect, useRef } from 'react';
import ReactLoading from 'react-loading';

const Loader = (props) => {
    const targetRef = useRef();
    useEffect(()=> {
        if(props.background === 'true') {
            targetRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        }else{
            targetRef.current.style.backgroundColor = "rgba(0, 0, 0, 0)";
        }
    });
    return (
        <div ref={targetRef} className={styles.Loader_wrap} style={{
            position: props.position === 'true' ? 'absolute' : 'fixed',
            width: "100%",
            minHeight: props.minHeight,
            height: "100%",
            zIndex: "2000"
        }}>
            <div style={{
                position: props.position === 'true' ? 'absolute' : 'fixed',
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <ReactLoading
                    type={'spin'}
                    color={'rgb(150,150,180)'}
                    height={'50px'}
                    width={'50px'}
                />
            </div>
        </div>
    )
}

export default Loader;