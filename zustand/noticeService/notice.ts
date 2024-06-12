import { create } from "zustand"
import { CreateNotice } from "../types";
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
    updateNoticeById: async (noticeId: string, noticeForm: CreateNotice) => {
        try {
            const response = await updateNoticeById(noticeId, noticeForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteNoticeById: async (noticeId: string) => {
        try {
            const response = await deleteNoticeById(noticeId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useNotice = create(application)