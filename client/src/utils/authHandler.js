const authHandler = {
    isAuthenticated: false,
    signIn(cb) {
        this.isAuthenticated = true
    },
    signOut(cb) {
        this.isAuthenticated = false
    }
};

export default authHandler;