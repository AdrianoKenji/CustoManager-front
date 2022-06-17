import baseURL from "@/api"

var urlBase = "/produtos"

class ProductService {

    registerProduct(obj) {
        return baseURL.post(urlBase + "/cadastrar", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getProductsByCompanyId(id, orderBy = "id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.get(urlBase + "/get-produtos-by-empresa-id" +
            '?idEmpresa=' + id +
            '&orderBy=' + orderBy +
            '&orderAsc=' + orderAsc +
            '&pageNumber=' + offset +
            '&pageSize=' + limit, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    search(busca, chave, idEmpresa, orderBy = "Id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.get(urlBase + "/search" +
            '?busca=' + busca +
            '&chave=' + chave +
            '&idEmpresa=' + idEmpresa +
            '&orderBy=' + orderBy +
            '&orderAsc=' + orderAsc +
            '&pageNumber=' + offset +
            '&pageSize=' + limit, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getProductById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateProduct(product) {
        return baseURL.put(urlBase + "/update", product, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new ProductService();