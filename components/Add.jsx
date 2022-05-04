import React from 'react'
import styles from '../styles/add.module.css'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const Add = ({setClose, host}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    const changePrice = (e, index)=>{
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);

  };

  const handleCreate = async () => {
    const data= new FormData();
    data.append('file', file);
    data.append("upload_preset", "upload")
    try {
        const uploadRes= await axios.post('https://api.cloudinary.com/v1_1/thevine/image/upload', data) 

        const {url} = uploadRes.data;
        const newProduct = {
            title,
            desc,
            extraOptions,
            img: url,
        }

        await axios.post(`http://${host}/api/products`, newProduct)
        setClose(true)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={()=> setClose(true) } className={styles.close}>X</span>
            <h1>Add New Pizza</h1>
            <div className={styles.item}>
                <label className={styles.label}>
                    Choose an Image
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Title</label>
                <input
                    className={styles.input}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Desc</label>
                <textarea
                    rows={4}
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Prices</label>
                <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Small' onChange={(e)=>changePrice(e, 0)} />
                <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Medium' onChange={(e)=>changePrice(e, 1)} />
                <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Large' onChange={(e)=>changePrice(e, 2)} />
            </div>
            <div>
                <label className={styles.label}>Extra</label>
                <div className={styles.extra}>

                    <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type="text"
                    placeholder="Item"
                    name="text"
                    onChange={handleExtraInput}
                    />
                    <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type="number"
                    placeholder="Price"
                    name="price"
                    onChange={handleExtraInput}
                    />
                    
                    <button className={styles.extraButton} onClick={handleExtra}>
                    Add
                    </button>
                </div>
                <div className={styles.extraItems}>
                    {extraOptions.map((option) => (
                    <span key={option.text} className={styles.extraItem}>
                        {option.text}
                    </span>
                    ))}
                </div>
            </div>
            <button className={styles.addButton} onClick={handleCreate}>
                Create
            </button>
        </div>
    </div>
  )
}

export const getServerSideProps = async (context)=>{
    const {req} = context

    let host
    if(req){
        host = req.headers.host
    }

    return{
        props:{
            host,
        },
    }

}