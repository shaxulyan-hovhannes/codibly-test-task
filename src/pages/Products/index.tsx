import { useState, useEffect, useMemo } from 'react';

import styles from './index.module.scss';

import FilterProductsById from '../../components/FilterProductsById';
import Table from './../../components/UI/Table'

import { getAllProductsAsync } from './../../store/reducers/products/productsSlice'

import {useAppDispatch, useAppSelector} from './../../hooks'

import { PRODUCTS_TABLE_HEAD_DATA } from './../../constants/products'

const Products = () => {
    const [searchTerm, setSearchTerm] = useState(0);

    const dispatch = useAppDispatch();

    const { data, page, per_page, total, status } = useAppSelector(state => state.products)

    console.log({data})

    const productsTableBodyData = useMemo(() => {
        if (!searchTerm) return data;

        return data.find(product => product.id === searchTerm);
    }, [data, searchTerm])

    useEffect(() => {
        dispatch(getAllProductsAsync({page, per_page}))
    }, [dispatch, page, per_page]);

    return <div className={styles.productsPageRoot}>
        <div className={styles.filterBlock}><FilterProductsById /></div>
        <div className={styles.listBlock}>
            <Table headData={PRODUCTS_TABLE_HEAD_DATA} bodyData={data} onRowClick={() => {}} />
        </div>
    </div>
}

export default Products;
