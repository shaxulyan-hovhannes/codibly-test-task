import { useState, useEffect, useMemo } from 'react';

import styles from './index.module.scss';

import FilterProductsById from '../../components/FilterProductsById';
import Table from './../../components/UI/Table'

import { getAllProductsAsync } from './../../store/reducers/products/productsSlice'

import {useAppDispatch, useAppSelector} from './../../hooks'

import { PRODUCTS_TABLE_HEAD_DATA } from './../../constants/products'

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useAppDispatch();

    const { data, page, per_page, total, status } = useAppSelector(state => state.products)

    console.log({data})

    const productsTableBodyData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter(product => product.id === parseInt(searchTerm));
    }, [data, searchTerm])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const parsedValue = parseInt(value);

     console.log({value, parsedValue}, parsedValue === parsedValue)

     if (isNaN(parsedValue)) {
        setSearchTerm(value.slice(0, 2));
     }
     else setSearchTerm(value);
    }

    useEffect(() => {
        dispatch(getAllProductsAsync({page, per_page}))
    }, [dispatch, page, per_page]);


    if (status === 'loading') return <strong>LOADING...</strong>;

    return <div className={styles.productsPageRoot}>
        <div className={styles.filterBlock}><FilterProductsById onChange={handleFilterChange} type="number" /></div>
        <div className={styles.listBlock}>
            <Table headData={PRODUCTS_TABLE_HEAD_DATA} bodyData={productsTableBodyData} onRowClick={() => {}} />
        </div>
    </div>
}

export default Products;
