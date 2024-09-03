import { FileWithPath } from "react-dropzone";

export const getBase64 = (file: File) => new Promise((resolve, reject) => {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});