import { create } from 'zustand'
import {
    createNotice,
    deleteNoticeById,
    getNotice,
    getNoticeById,
    updateNoticeById,
} from '@api/noticeService/noticeService'
import { generalAction } from '@store/application/useApplication'
import { IResponse } from '@api/globalHandler'
import { CreateNoticeDto, DeleteNoticeDto, EditNoticeDto, GetNoticeDto } from '@dtos/notice/notice.dto'

interface State {
    notice: GetNoticeDto
    notices: GetNoticeDto[]
    totalNotices: number
}

interface Actions {
    createNoticeAction: (notice: CreateNoticeDto) => Promise<any>
    getNoticeByIdAction: (noticeGuid: string) => Promise<any>
    updateNoticeByIdAction: (noticeForm: EditNoticeDto) => Promise<any>
    deleteNoticeByIdAction: (deleteNotice: DeleteNoticeDto) => Promise<any>
    getNoticeAction: (page: number, limit: number) => Promise<IResponse<any>>
    resetNoticeAction: () => void
}

export const useNotice = create<State & Actions>((set) => ({
    notice: {} as GetNoticeDto,
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
    createNoticeAction: async (notice: CreateNoticeDto) => {
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
    updateNoticeByIdAction: async (noticeForm: EditNoticeDto) => {
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
    deleteNoticeByIdAction: async (deleteNotice: DeleteNoticeDto) => {
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