import { create } from "zustand"
import { GetUser, GetUserDetails } from "../types";
import { getUserDetailsById, getUserList } from "@api/userManagementService/userManagementService";
import { IResponse } from "@api/globalHandler";

interface userManagementState {
    isLoading: boolean;
    error: string | null;
    getUserList: (isActive: boolean) => Promise<IResponse<GetUser[]>>;
    getUserDetails: (userId: string) => Promise<IResponse<GetUserDetails>>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserManagement = create<userManagementState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    getUserList: async (isActive: boolean) => {
        let response : IResponse<GetUser[]> = {} as IResponse<GetUser[]>;
        try {
            set({ isLoading: true, error: null });
            response = await getUserList(isActive);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
    getUserDetails: async (userId: string) => {
        let response : IResponse<GetUserDetails> = {} as IResponse<GetUserDetails>;
        try {
            set({ isLoading: true, error: null });
            response = await getUserDetailsById(userId);
            console.log(response)
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    }
}))