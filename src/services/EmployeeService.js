import baseURL from "@/api"

var urlBase = "/vinculos"

class EmployeeService {

    getEmployeeByCompanyId(id) {
        return baseURL.get(urlBase + "/get-vinculos-by-empresa-id?idEmpresa=" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    insertEmployerInCompany(obj) {
        return baseURL.post(urlBase + "/criar-vinculo", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    deleteEmployee(id) {
        return baseURL.delete(urlBase + "/delete/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new EmployeeService();