import baseURL from "@/api"

var urlBase = "/users";

class UserService {

    register(user) {
        return baseURL.post(urlBase + "/register", user)
    }

    getAllUser(orderBy = "Id", orderAsc = false, offset = 0, limit = 0) {
        console.log(orderBy)
        console.log(orderAsc)
        console.log(offset)
        console.log(limit)
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

    updateUser(usuario) {
        return baseURL.put(urlBase + "/update", usuario, {
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
}

export default new UserService();