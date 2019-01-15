import axios from "axios";

export default {
    create: function(exportObject){
        return axios.post("/api/media/create/", exportObject)
    },

    delete: function(id) {
        return axios.delete("api/media/delete/" + id)
    },

    toggleActive: function(id) {
        return axios.get("api/media/active/" + id)
    },
    toggleComplete: function(id) {
        return axios.get("api/media/complete/"+id);
    }
}