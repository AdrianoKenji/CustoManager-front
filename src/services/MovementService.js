import baseURL from "@/api"

var urlBase = "/movimentacoes"

class MovementService {

    registerMovement(obj) {
        return baseURL.post(urlBase + "/cadastrar", obj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getMovementByCompanyId(id, orderBy = "id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.get(urlBase + "/get-movimentacoes-by-empresa-id" +
            '?idEmpresa=' + id +
            '&orderBy=' + orderBy +
            '&orderAsc=' + orderAsc +
            '&pageNumber=' + offset +
            '&pageSize=' + limit, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    search(busca, chave, idEmpresa, orderBy = "Id", orderAsc = false, offset = 0, limit = 0) {
        return baseURL.get(urlBase + "/search" +
            '?busca=' + busca +
            '&chave=' + chave +
            '&idEmpresa=' + idEmpresa +
            '&orderBy=' + orderBy +
            '&orderAsc=' + orderAsc +
            '&pageNumber=' + offset +
            '&pageSize=' + limit, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getMovementById(id) {
        return baseURL.get(urlBase + "/get-by-id/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    updateMovement(movement) {
        return baseURL.put(urlBase + "/update", movement, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    delete(id) {
        return baseURL.delete(urlBase + "/delete/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    getMovementQuantityByCompanyId(id) {
        return baseURL.get(urlBase + "/get-quantidade-by-tipo/" + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}

export default new MovementService();