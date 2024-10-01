import { create } from "zustand"
import { CreateNotice, DeleteNotice, EditNotice } from "../types";
import { createNotice, deleteNoticeById, getNotice, getNoticeById, updateNoticeById } from "@api/noticeService/noticeService";

interface noticeState {
    isLoading: boolean;
    error: string | null;
    createNotice: (notice : CreateNotice) => Promise<any>;
    getNotice: () => Promise<any>;
    getNoticeById: (noticeGuid: string) => Promise<any>;
    updateNoticeById: (noticeForm: EditNotice) => Promise<any>;
    deleteNoticeById: (deleteNotice: DeleteNotice) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useNotice = create<noticeState>((set) => ({
    isLoading: false,
    error: null, 
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    createNotice: async (notice : CreateNotice) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createNotice(notice);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    getNotice: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getNotice();
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false });
        }
    },
    getNoticeById: async (noticeGuid: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getNoticeById(noticeGuid);
            return response;
        } catch (error : any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false });
        }
    },
    updateNoticeById: async (noticeForm: EditNotice) => {
        try {
            set({ isLoading: true, error: null });
            const response = await updateNoticeById(noticeForm);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    deleteNoticeById: async (deleteNotice: DeleteNotice) => {
        try {
            set({ isLoading: true, error: null });
            const response = await deleteNoticeById(deleteNotice);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false });
        }
    }
}))