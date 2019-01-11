import axios from "axios";

export default {
    create: function(exportObject, id){
        return axios.post("/api/media/create/" + id, exportObject)
    },

    delete: function(id) {
        return axios.delete("api/media/delete/" + id)
    },

    toggleActive: function(id) {
        return axios.get("api/media/active/" + id)
    }
}