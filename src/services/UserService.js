import baseURL from "@/api"

var urlBase = "/users";

class UserService {

    register(user) {
        return baseURL.post(urlBase + "/register", user)
    }

    getAllUser() {
        return baseURL.get(urlBase + "/get-all", {
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
        return baseURL.get(urlBase + "/delete/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new UserService();