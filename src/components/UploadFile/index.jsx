import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
const PhotoUpload = ({onClose, onUploaded }) => {
    const fileInput = useRef();
    const navigate = useNavigate()
    const handleClose = () => {
        navigate(-1);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = fileInput.current.files[0];
        if(!file) return alert("Chọn file");

        const formData = new FormData();
        formData.append("photo", file);
        const res = await fetch("http://localhost:3000/api/photos/new", {
            method: "POST",
            credentials: "include",
            body: formData,
    });
    if (res.ok) {
        onUploaded();
        onClose();
    } else {
        alert("Upload thất bại");
    }
    }
    return (
        <form onSubmit ={handleSubmit}>
            <input type="file" ref = {fileInput} accept="image/*"/>
            <button type="submit">Upload</button>
            <button type="button" onClick={handleClose}>Cancel</button>
        </form>
    )
};

export default PhotoUpload; 