import { useEffect } from 'react';
import axios from '../../services/axios';

import styles from './index.module.scss';

import FilterProductsById from '../../components/FilterProductsById';

const Products = () => {
    useEffect(() => {
        console.log({env: process.env.REACT_APP_REQRES_API_URL})
        const fetched = axios.request({
            url: "/products",
            method: 'GET',
        })

        console.log('FETCHED', fetched)
    }, []);

    return <div className={styles.productsPageRoot}>
        <div className={styles.filterBlock}><FilterProductsById /></div>
        <div className={styles.listBlock}>
            <div
            style={{height: 5000, background: 'green'}}
            >
                </div></div>
    </div>
}

export default Products;
