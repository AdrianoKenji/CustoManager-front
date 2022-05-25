import baseURL from "@/api"

var urlBase = "/marca-produto"

class BrandService {

    registerBrand(obj) {
        return baseURL.post(urlBase + "/cadastrar-marca", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getBrandsByCompanyId(id, orderBy = "id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.get(urlBase + "/get-marcas-produto-by-empresa-id" +
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

    getBrandById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateBrand(brand) {
        return baseURL.put(urlBase + "/update", brand, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new BrandService();