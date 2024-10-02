import { create } from "zustand"
import { GetUser, GetUserDetails } from "../types";
import { activateUserById, deactivateUserById, getUserDetailsById, getUserList } from "@api/userManagementService/userManagementService";
import { IResponse } from "@api/globalHandler";

interface userManagementState {
    isLoading: boolean;
    error: string | null;
    getUserList: (isActive: boolean, page: number, limit: number) => Promise<IResponse<any>>;
    getUserDetails: (userGuid: string) => Promise<IResponse<GetUserDetails>>;
    activateUserByIdAction: (userGuid: string) => Promise<IResponse<any>>;
    deactivateUserByIdAction: (userGuid: string) => Promise<IResponse<any>>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserManagement = create<userManagementState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    getUserList: async (isActive: boolean, page: number, limit: number) => {
        let response : IResponse<GetUser[]> = {} as IResponse<any>;
        try {
            set({ isLoading: true, error: null });
            response = await getUserList(isActive, page, limit);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
    getUserDetails: async (userGuid: string) => {
        let response : IResponse<GetUserDetails> = {} as IResponse<GetUserDetails>;
        try {
            set({ isLoading: true, error: null });
            response = await getUserDetailsById(userGuid);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
    activateUserByIdAction: async (userGuid: string) => {
        let response : IResponse<any> = {} as IResponse<any>;
        try {
            set({ isLoading: true, error: null });
            response = await activateUserById(userGuid);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    },
    deactivateUserByIdAction: async (userGuid: string) => {
        let response : IResponse<any> = {} as IResponse<any>;
        try {
            set({ isLoading: true, error: null });
            response = await deactivateUserById(userGuid);
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
            return response;
        }
    }
}))