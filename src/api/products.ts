import axios from "../services/axios";

class ProductsApi {
    getProducts({page, per_page}: {page: number, per_page: number}) {
        const fetched = axios.request({
            url: `/products?page=${page}&per_page=${per_page}`,
            method: 'GET',
        })

        return fetched;
    }
}

const productsApi = new ProductsApi();

export default productsApi