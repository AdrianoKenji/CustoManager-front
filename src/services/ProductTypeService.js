import baseURL from "@/api"

var urlBase = "/tipo-produto"

class TipoProdutoService {

    registerProductType(obj) {
        return baseURL.post(urlBase + "/cadastrar-tipo", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getTipoByCompanyId(id, orderBy = "id", orderAsc = false, offset = 0, limit = 9999) {
        return baseURL.get(urlBase + "/get-tipos-produto-by-empresa-id" +
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

    search(filters, orderBy = "Id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.post(urlBase + "/search" +
            '?orderBy=' + orderBy +
            '&orderAsc=' + orderAsc +
            '&pageNumber=' + offset +
            '&pageSize=' + limit, filters, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getProductTypeById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateProductType(productType) {
        return baseURL.put(urlBase + "/update", productType, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new TipoProdutoService();