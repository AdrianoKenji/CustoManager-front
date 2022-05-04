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
}

export default new CompanyService();