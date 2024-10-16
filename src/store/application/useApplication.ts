import { create } from 'zustand'
import { useModal } from '@store/modal/useModal'
import { IResponse } from '@api/globalHandler'

interface State {
    isLoading: boolean
}

interface Actions {
    setIsLoading: (isLoading: boolean) => void
}

export const useApplication = create<State & Actions>((set) => ({
    isLoading: false,
    setIsLoading(isLoading) {
        set({ isLoading })
    },
}))

export const internalGeneralAction = async (action: () => Promise<any>, successMessage?: string, errorMessage?: string) => {
    const { setIsLoading } = useApplication.getState()
    const { setCustomConfirmModalAction } = useModal.getState()
    setIsLoading(true)

    try {
        await action()
        if (successMessage) {
            setCustomConfirmModalAction({
                title: 'Success',
                subtitle: successMessage,
                isError: false,
            })
        }
    } catch (error: Error | any) {
        if (errorMessage) {
            // const errorMsg = error?.message || errorMessage
            setCustomConfirmModalAction({
                title: 'Error',
                subtitle: errorMessage,
                isError: true,
            })
        }
    } finally {
        setIsLoading(false)
    }
}

export const generalAction = async <T>(
    action: () => Promise<IResponse<T>>,
    successMessage?: string,
    errorMessage?: string
): Promise<IResponse<T>> => {
    const { setIsLoading } = useApplication.getState()
    const { setCustomConfirmModalAction } = useModal.getState()
    let result: IResponse<T> = {} as IResponse<T>
    setIsLoading(true)

    try {
        result = await action()
        if (successMessage) {
            setCustomConfirmModalAction({
                title: 'Success',
                subtitle: successMessage,
                isError: false,
            })
        }
    } catch (error: Error | any) {
        if (errorMessage) {
            const errorMsg = error?.message || errorMessage
            setCustomConfirmModalAction({
                title: 'Error',
                subtitle: errorMsg,
                isError: true,
            })
        }
    } finally {
        setIsLoading(false)
        return result
    }
}
