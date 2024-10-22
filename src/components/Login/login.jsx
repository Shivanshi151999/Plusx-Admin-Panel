import React from 'react'
import styles from './login.module.css'
import PanelLogo from '../SharedComponent/CompanyLogo'

const login = () => {
    return (
        <div className="container">
            <div className={styles.formMainContainer}>
                <div className={styles.formSection}>
                    <div className={styles.formImgSection} >
                        <PanelLogo />
                    </div>
                    <form className={styles.formContainer}>
                        <div className={styles.formFiled}>
                            <label className={styles.formLabel}>Username</label>
                            <input className={styles.formInput} type="text" />
                        </div>
                        <div className={styles.formFiled}>
                            <label className={styles.formLabel}>Password</label>
                            <input className={styles.formInput} type="password" />
                        </div>
                        <div className={styles.formPassword}>
                            Forgot Password ?
                        </div>
                        <div className={styles.formButtonSection}>
                            <div className={styles.formButton}>Login</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default login