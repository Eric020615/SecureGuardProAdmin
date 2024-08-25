import { create } from "zustand"
import { GetUser, GetUserDetails } from "../types";
import { activateUserById, deactivateUserById, getUserDetailsById, getUserList } from "@api/userManagementService/userManagementService";
import { IResponse } from "@api/globalHandler";

interface userManagementState {
    isLoading: boolean;
    error: string | null;
    getUserList: (isActive: boolean) => Promise<IResponse<GetUser[]>>;
    getUserDetails: (userId: string) => Promise<IResponse<GetUserDetails>>;
    activateUserByIdAction: (userId: string) => Promise<IResponse<any>>;
    deactivateUserByIdAction: (userId: string) => Promise<IResponse<any>>;
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
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
    activateUserByIdAction: async (userId: string) => {
        let response : IResponse<any> = {} as IResponse<any>;
        try {
            set({ isLoading: true, error: null });
            response = await activateUserById(userId);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
    deactivateUserByIdAction: async (userId: string) => {
        let response : IResponse<any> = {} as IResponse<any>;
        try {
            set({ isLoading: true, error: null });
            response = await deactivateUserById(userId);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    }
}))