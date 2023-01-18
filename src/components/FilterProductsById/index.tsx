import TextField from './../../components/UI/TextField'

import styles from './index.module.scss'

interface FIlterProductsByIdProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
  }

const FilterProductsById = ({onChange, type}: FIlterProductsByIdProps) => {
    return <div className={styles.filterProductsByIdRoot}>
        <TextField onChange={onChange} type={type} />
    </div>
}

export default FilterProductsById