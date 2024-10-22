import React, { useState } from 'react';
import styles from './login.module.css';
import PanelLogo from '../SharedComponent/CompanyLogo';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        if (password.length > 0) {
            setPasswordVisible(!passwordVisible);
        }
    };

    return (
        <div className="container">
            <div className={styles.formMainContainer}>
                <div className={styles.formSection}>
                    <div className={styles.formImgSection}>
                        <PanelLogo />
                    </div>
                    <form className={styles.formContainer}>
                        <div className={styles.formFiled}>
                            <label className={styles.formLabel}>Username</label>
                            <input className={styles.formInput} type="text" />
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
                        </div>
                        <div className={styles.formPassword}>
                            Forgot Password?
                        </div>
                        <div className={styles.formButtonSection}>
                            <div className={styles.formButton}>Login</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
