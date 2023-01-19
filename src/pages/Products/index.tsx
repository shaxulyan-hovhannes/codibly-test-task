import { useState, useEffect, useMemo, useCallback, SetStateAction } from 'react';

import styles from './index.module.scss';

import FilterProductsById from '../../components/FilterProductsById';
import Table from './../../components/UI/Table';
import Dialog from './../../components/UI/Dialog';
import Pagination, { ArrowVariation } from '../../components/UI/Pagination';
import { SelectChangeEvent } from '@mui/material/Select';

import { getAllProductsAsync, setPage, selectPerPage } from './../../store/reducers/products/productsSlice'

import {useAppDispatch, useAppSelector} from './../../hooks'

import { PRODUCTS_TABLE_HEAD_DATA, PER_PAGE_OPTION_ITEMS } from './../../constants/products'

import { ProductsInterface } from './../../models'

const Products = () => {
    const [ selectedProduct, setSelectedProduct ] = useState<SetStateAction <any>>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const dispatch = useAppDispatch();

    const { data, page, per_page, total, status } = useAppSelector(state => state.products)

    const productsTableBodyData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter(product => product.id === parseInt(searchTerm));
    }, [data, searchTerm])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchTerm(value)
    }

    const onRowClick = useCallback((row: ProductsInterface) => {

        setSelectedProduct(row);
        
        setDialogOpen(true);
    }, [])

    const onDialogClose = useCallback(() => {
        setDialogOpen(false);

        setSelectedProduct(null);
    }, [])

    const onSelectPage = useCallback((variation: ArrowVariation) => {
      let currentPage = page;

      if (variation === 'left') {
        if (currentPage < 2) return;

        currentPage -= 1;
      }

      if (variation === 'right') {
        if (currentPage < (Math.ceil(total / per_page))) {
            currentPage += 1
        }
        else return;
      }

      dispatch(setPage(currentPage))
    }, [page, total, per_page, dispatch]);

    const onPerPageChange = (e:SelectChangeEvent) => {
        setSearchTerm('');

        const {value} = e.target;

        dispatch(selectPerPage(value))
    }

    useEffect(() => {
        dispatch(getAllProductsAsync({page, per_page}))
    }, [dispatch, page, per_page]);


    if (status === 'loading') return <strong>LOADING...</strong>;

    return <div className={styles.productsPageRoot}>
        <div className={styles.filterBlock}><FilterProductsById onChange={handleFilterChange} type="number" /></div>
        <div className={styles.listBlock}>
            <Table headData={PRODUCTS_TABLE_HEAD_DATA} bodyData={productsTableBodyData} onRowClick={onRowClick} />
        </div>
        <div className={styles.paginationBlock}>
            <Pagination total={total} page={page} per_page={per_page}
            onSelectPage={onSelectPage} perPageOptions={PER_PAGE_OPTION_ITEMS}
            onPerPageChange={onPerPageChange}
            />
        </div>
        <Dialog dialogTitle="Product details" open={ dialogOpen } onClose={onDialogClose}>
         {PRODUCTS_TABLE_HEAD_DATA.map(data => {
            const id = data.id;
            return (
                <div className={styles.productDetailsBlock} key={data.id}>
                <p className={styles.label}>{data.label}:</p>
                {id === 'color' ? <p style={{width: 100, height: 25, background: selectedProduct?.[id]}}></p> : <p>{selectedProduct?.[id]}</p>}
            </div>
          )
         })}  
        </Dialog>
    </div>
}

export default Products;
