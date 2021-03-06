import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../../styles/login.module.css'

const Login = ({host}) => {
    console.log(host)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)
    const router = useRouter();

    const handleClick = async () => {
        try {
            await axios.post(`http://${host}/api/login`, {username, password})
            router.push('/admin')
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

     
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Admin Dashboard</h1>
            <input
            placeholder="username"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            placeholder="password"
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} className={styles.button}>
            Sign In
            </button>
            {error && <span className={styles.error}>Wrong Credentials!</span>}
        </div>
    </div>
  )
}

export default Login

export const getServerSideProps = async ({req}) => {
    
    let host 
    if(req){
        host = req.headers.host
    }

    return{
        props: {
            host,
        },
    }
}