import axios from "axios"

const authHandler = {
    isAuthenticated: false,
    checkAuth(cb) {
        axios.get("/login/check")
        .then(res => {
            this.isAuthenticated = res.data
        })
    }
}

export default authHandler
