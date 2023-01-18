import axios from "../services/axios";

class ProductsApi {
    async getProducts() {
        const fetched = await axios.request({
            url: "/products",
            method: 'GET',
        })

        return fetched;
    }
}

const productsApi = new ProductsApi();

export default productsApi