import baseURL from "@/api"

var urlBase = "/associados"

class PartnerService {

    insertPartnerInCompany(obj) {
        return baseURL.post(urlBase + "/register", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getPartnerById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updatePartner(partner) {
        return baseURL.put(urlBase + "/update", partner, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    deletePartner(id) {
        return baseURL.delete(urlBase + "/delete/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new PartnerService();