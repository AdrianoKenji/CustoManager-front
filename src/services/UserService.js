import baseURL from "@/api"

var urlBase = "/users";
var emailUrlBase = "/email";

class UserService {

    register(user) {
        return baseURL.post(urlBase + "/register", user)
    }

    getAllUser(orderBy = "Id", orderAsc = false, offset = 0, limit = 0) {
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

    getUserById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getUserByCPF(cpf) {
        return baseURL.get(urlBase + "/get-by-cpf?cpf=" + cpf, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateUser(user) {
        return baseURL.put(urlBase + "/update", user, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    deleteUser(id) {
        return baseURL.delete(urlBase + "/delete/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    sendMailToUser(email, token) {
        return baseURL.get(emailUrlBase + "/send-recovery-password-email" +
            '?email=' + email +
            '&token=' + token, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new UserService();