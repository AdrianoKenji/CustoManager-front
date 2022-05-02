import baseURL from "@/api"

var userUrlBase = "/users"

class AuthService {

    login(credentials) {
        return baseURL.post(userUrlBase + "/login", credentials)
    }
}

export default new AuthService();