import axios from "axios";

const authHandler = {
    isAuthenticated: false,
    checkAuth(cb) {
        axios.get("/login/check")
        .then(res => {
            console.log(res.data)
            this.isAuthenticated = res.data
        })
    }
};

export default authHandler;