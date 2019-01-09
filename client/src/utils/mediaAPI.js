import axios from "axios";

export default {
    saveMedia: function(exportObject, id){
        return axios.post("/api/media/create/" + id, exportObject)
    }
    
}