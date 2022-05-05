import baseURL from "@/api"

var urlBase = "/empresas"
var urlVinculoBase = "/vinculos"
var urlAssociadosBase = "/associados"

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

    insertEmployerInCompany(obj) {
        return baseURL.post(urlVinculoBase + "/criar-vinculo", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    insertPartnerInCompany(obj) {
        return baseURL.post(urlAssociadosBase + "/register", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new CompanyService();