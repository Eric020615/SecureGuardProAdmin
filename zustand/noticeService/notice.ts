import { create } from "zustand"
import { CreateNotice, DeleteNotice, UpdateNotice } from "../types";
import { createNotice, deleteNoticeById, getNotice, getNoticeById, updateNoticeById } from "@/api/noticeService/noticeService";

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
    },
    getNoticeById: async (noticeId: string) => {
        try {
            const response = await getNoticeById(noticeId);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    updateNoticeById: async (noticeForm: UpdateNotice) => {
        try {
            const response = await updateNoticeById(noticeForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteNoticeById: async (deleteNotice: DeleteNotice) => {
        try {
            const response = await deleteNoticeById(deleteNotice);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useNotice = create(application)