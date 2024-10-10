import { create } from 'zustand'
import { CreateNotice, DeleteNotice, EditNotice, GetNotice } from '../types'
import {
    createNotice,
    deleteNoticeById,
    getNotice,
    getNoticeById,
    updateNoticeById,
} from '@api/noticeService/noticeService'
import { generalAction } from '@zustand/application/useApplication'
import { IResponse } from '@api/globalHandler'

interface State {
    notice: GetNotice
    notices: GetNotice[]
    totalNotices: number
}

interface Actions {
    createNoticeAction: (notice: CreateNotice) => Promise<any>
    getNoticeByIdAction: (noticeGuid: string) => Promise<any>
    updateNoticeByIdAction: (noticeForm: EditNotice) => Promise<any>
    deleteNoticeByIdAction: (deleteNotice: DeleteNotice) => Promise<any>
    getNoticeAction: (page: number, limit: number) => Promise<IResponse<any>>
    resetNoticeAction: () => void
}

export const useNotice = create<State & Actions>((set) => ({
    notice: {} as GetNotice,
    notices: [],
    totalNotices: 0,
    getNoticeAction: async (page: number, limit: number) => {
        return generalAction(
            async () => {
                const response = await getNotice(page, limit)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set((state) => ({
                    notices: [...state.notices, ...response.data.list],
                }))
                set({ totalNotices: response.data.count })
                return response
            },
            '',
            'Failed to retrieve notices. Please try again.'
        )
    },
    resetNoticeAction() {
        set({ notices: [], totalNotices: 0 })
    },
    createNoticeAction: async (notice: CreateNotice) => {
        return generalAction(
            async () => {
                const response = await createNotice(notice)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Notice successfully created!',
            'Failed to create notice. Please try again.'
        )
    },
    getNoticeByIdAction: async (noticeGuid: string) => {
        return generalAction(
            async () => {
                const response = await getNoticeById(noticeGuid)
                set({ notice: response.data })
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            '',
            'Failed to retrieve notice. Please try again.'
        )
    },
    updateNoticeByIdAction: async (noticeForm: EditNotice) => {
        return generalAction(
            async () => {
                const response = await updateNoticeById(noticeForm)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Notice successfully updated!',
            'Failed to update notice. Please try again.'
        )
    },
    deleteNoticeByIdAction: async (deleteNotice: DeleteNotice) => {
        return generalAction(
            async () => {
                const response = await deleteNoticeById(deleteNotice)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Notice successfully deleted!',
            'Failed to delete notice. Please try again.'
        )
    },
}))