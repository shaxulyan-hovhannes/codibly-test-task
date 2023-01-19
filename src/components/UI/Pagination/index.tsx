import { useState, useMemo, useCallback } from 'react'

import styles from './index.module.scss'

import ArrowIcon from './../../../assets/pagination_arrow_icon.svg'

export type ArrowVariation = 'left' | 'right'

interface PaginationProps {
    arrowSize?: number | string,
    total: number,
    page: number,
    per_page: number,
    onSelectPage: (page: ArrowVariation) => void
}

const Pagination = ({ arrowSize = 70, total = 1, page = 1, per_page = 1, onSelectPage = () => {} }: PaginationProps) => {
    
    const totalPages = useMemo(() => Math.ceil(total / per_page), [total, per_page]);

    // const handleLeftArroClick = useCallback(() => {
    //     const currentPage = selectedPage - 1;

    //     if (currentPage < 1) return;
        
    //     setSelectedPage(currentPage);

    //     onSelectPage(currentPage)
    // }, [selectedPage, onSelectPage])

    // const handleClickRightArrow = useCallback(() => {
    //     const currentPage = selectedPage + 1;

    //     if (currentPage > totalPages) return;

    //     setSelectedPage(currentPage)

    //     onSelectPage(currentPage)
    // }, [selectedPage, totalPages, onSelectPage])

    const handleArrowClick = useCallback<any>((variation: ArrowVariation) => {
        onSelectPage(variation)
    }, [onSelectPage])
    
    console.log({page})

    return <div className={styles.paginationRoot}>
        <div style={{width: arrowSize, height: arrowSize}}
        className={`${styles.arrowBlock} ${page > 1 ? styles.activeArrowBlock : ''}`}
        onClick={handleArrowClick('left')}
        >
        <img src={ArrowIcon} alt="Pagination arrow left" />
        {page < 2 ?   <div className={styles.disabledBlock}></div> : null}
        </div>

        <div style={{width: arrowSize, height: arrowSize}}
        className={`${styles.arrowBlock} ${page < totalPages ? styles.activeArrowBlock : ''}`}
        onClick={handleArrowClick('right')}
        >
        <img src={ArrowIcon} alt="Pagination arrow left" />
        {page >= totalPages ? <div className={styles.disabledBlock}></div> : null}
        </div>
    </div>
}

export default Pagination