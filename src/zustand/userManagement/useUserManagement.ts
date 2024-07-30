import { create } from "zustand"
import { GetUser } from "../types";
import { getUserList } from "@api/userManagementService/userManagementService";
import { IResponse } from "@api/globalHandler";

interface userManagementState {
    isLoading: boolean;
    error: string | null;
    getUserList: () => Promise<IResponse<GetUser[]>>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserManagement = create<userManagementState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    getUserList: async () => {
        let response : IResponse<GetUser[]> = {} as IResponse<GetUser[]>;
        try {
            set({ isLoading: true, error: null });
            response = await getUserList();
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
}))