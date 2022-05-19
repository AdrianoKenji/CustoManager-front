import baseURL from "@/api"

var urlBase = "/marca-produto"

class MarcaProdutoService {


    getMarcaByCompanyId(id, orderBy = "id", orderAsc = false, offset = 0, limit = 9999) {
        return baseURL.get(urlBase + "/get-marcas-produto-by-empresa-id" +
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

export default new MarcaProdutoService();