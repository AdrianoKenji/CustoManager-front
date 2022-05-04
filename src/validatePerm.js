import TokenUtils from "./utils/TokenUtils"

class validatePerm {
    canEnterPage(next) {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next({ name: 'Home' })
        }
    }

    canEnterAdminPage(next) {
        let token = TokenUtils.getTokenAndDecodeToJson(localStorage.getItem('token'));
        if (token) {
            if (token.admin === true) {
                next()
            } else {
                next({ name: 'Forbidden' })
            }
        } else {
            next({ name: 'Home' })
        }
    }
}

export default new validatePerm();