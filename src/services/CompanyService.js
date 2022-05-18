import baseURL from "@/api"

var urlBase = "/empresas"

class CompanyService {
    registerCompany(obj) {
        return baseURL.post(urlBase + "/register", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getAllCompanies(orderBy = "Id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.get(urlBase + "/get-all" +
            '?orderBy=' + orderBy +
            '&orderAsc=' + orderAsc +
            '&pageNumber=' + offset +
            '&pageSize=' + limit, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getCompaniesByUserId(id) {
        return baseURL.get(urlBase + "/get-empresas-by-usuario/" + id, {
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

    getCompanyById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateCompany(company) {
        return baseURL.put(urlBase + "/update", company, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    deleteCompany(id) {
        return baseURL.delete(urlBase + "/delete/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new CompanyService();