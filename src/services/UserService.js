import baseURL from "@/api"

var urlBase = "/users";

class UserService {
    getAllUser() {
        return baseURL.get(urlBase + "/get-all")
    }
}

export default new UserService();