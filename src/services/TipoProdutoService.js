import baseURL from "@/api"

var urlBase = "/tipo-produto"

class TipoProdutoService {


    getTipoByCompanyId(id, orderBy = "id", orderAsc = false, offset = 0, limit = 9999) {
        return baseURL.get(urlBase + "/get-tipos-produto-by-empresa-id" +
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
}

export default new TipoProdutoService();