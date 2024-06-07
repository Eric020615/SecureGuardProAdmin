import { create } from "zustand"
import { CreateNotice } from "../types";
import { createNotice, getNotice } from "@/api/noticeService/noticeService";

const application = (set: any, get: any) => ({
    createNotice: async (notice : CreateNotice) => {
        try {
            const response = await createNotice(notice);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getNotice: async () => {
        try {
            const response = await getNotice();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useNotice = create(application)