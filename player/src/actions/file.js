export function uploadFile(file){
    console.log(file);
    // return async dispatch => {
    //     try {
    //         const formData = new FormData()
    //         formData.append('file', file)
    //         const uploadFile = {id: Date.now(), name: file.name, progress: 0}
    //         // dispatch(showUploader())
    //         // dispatch(addUploadFile(uploadFile))
    //         const response = axios.post(`http://localhost:5000/api/files/upload`, formData)
    //         // dispatch(addFile(response.data))
    //         console.log(response);
    //     } catch (e) {
    //         console.log(e.response.data.message);
    //     }
    // }
}