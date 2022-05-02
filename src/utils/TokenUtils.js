import jwtDecode from "jwt-decode";

class TokenUtils {
    getTokenAndDecodeToJson() {
        try {
            let storage = localStorage.getItem('token');
            let decode = jwtDecode(storage);

            let string = JSON.stringify(decode);
            let formated = string.replaceAll("\\\"", "\"");
            formated = formated.replace("\"[", "[")
            formated = formated.replace("]\"", "]")
            formated = formated.replace(":\"{", ":{")
            formated = formated.replace("}}\"", "}}")
            let object = JSON.parse(formated);

            return object;
        } catch (e) {
            console.log(e)
        }
    }
}

export default new TokenUtils();