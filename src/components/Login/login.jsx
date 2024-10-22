import React, { useState } from 'react';
import styles from './login.module.css';
import PanelLogo from '../SharedComponent/CompanyLogo';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { postRequest } from '../../api/Requests';

// const Login = () => {
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [password, setPassword] = useState("");

//     const togglePasswordVisibility = () => {
//         if (password.length > 0) {
//             setPasswordVisible(!passwordVisible);
//         }
//     };

//     return (
//         <div className="container">
//             <div className={styles.formMainContainer}>
//                 <div className={styles.formSection}>
//                     <div className={styles.formImgSection}>
//                         <PanelLogo />
//                     </div>
//                     <form className={styles.formContainer}>
//                         <div className={styles.formFiled}>
//                             <label className={styles.formLabel}>Username</label>
//                             <input className={styles.formInput} type="text" />
//                         </div>
//                         <div className={styles.formFiled}>
//                             <label className={styles.formLabel}>Password</label>
//                             <div className={styles.passwordContainer}>
//                                 <input
//                                     className={styles.formInput}
//                                     type={passwordVisible ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <div
//                                     className={styles.eyeIcon}
//                                     onClick={togglePasswordVisibility}
//                                     style={{ color: passwordVisible ? '#00ffc3' : '#fff' }}
//                                 >
//                                     {passwordVisible ? <FaEye /> : <FaEyeSlash />}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.formPassword}>
//                             Forgot Password?
//                         </div>
//                         <div className={styles.formButtonSection}>
//                             <div className={styles.formButton}>Login</div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: '', password: '' });

    const togglePasswordVisibility = () => {
        if (password.length > 0) {
            setPasswordVisible(!passwordVisible);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = { username: '', password: '' };

        if (!username.trim()) {
            validationErrors.username = 'Username is required';
        }
        if (!password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(validationErrors);

        if (!validationErrors.username && !validationErrors.password) {
            console.log('Form submitted successfully:', { username, password });
            
            const obj = {
                email: username,
                password :password
            }
    
            postRequest('login', obj, async(response) => {
                if (response.code === 200) {
                    // setTimeSlotList(response?.data)
                } else {
                    // toast(response.message, {type:'error'})
                    console.log('error in charger-booking-list api', response);
                }
            })
        }
    };

    return (
        <div className="container">
            <div className={styles.formMainContainer}>
                <div className={styles.formSection}>
                    <div className={styles.formImgSection}>
                        <PanelLogo />
                    </div>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.formFiled}>
                            <label className={styles.formLabel}>Username</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                maxLength={50}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <span className={styles.error}>{errors.username}</span>}
                        </div>
                        <div className={styles.formFiled}>
                            <label className={styles.formLabel}>Password</label>
                            <div className={styles.passwordContainer}>
                                <input
                                    className={styles.formInput}
                                    type={passwordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div
                                    className={styles.eyeIcon}
                                    onClick={togglePasswordVisibility}
                                    style={{ color: passwordVisible ? '#00ffc3' : '#fff' }}
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            {errors.password && <span className={styles.error}>{errors.password}</span>}
                        </div>
                        <div className={styles.formPassword}>
                            Forgot Password?
                        </div>
                        <div className={styles.formButtonSection}>
                            <button type="submit" className={styles.formButton}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Login;
