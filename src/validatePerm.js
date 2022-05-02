class validatePerm {
    canEnterPage(next) {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next({ name: 'Home' })
        }
    }
}

export default new validatePerm();