import GlobalHandler, { IPaginatedResponse, IResponse } from "@api/globalHandler"
import { listUrl } from "@api/listUrl"
import { GetVisitorDto } from "@dtos/visitor/visitor.dto"
import { getCookies } from "@lib/cookies"

export const getVisitors = async (page: number, limit: number): Promise<IPaginatedResponse<GetVisitorDto>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.vistorManagement.getVisitors.path,
            type: listUrl.vistorManagement.getVisitors.type,
            _token: cookieValue as string,
            data: { page, limit },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}


export const getVisitorDetailsById = async (
	visitorGuid: string,
): Promise<IResponse<GetVisitorDto>> => {
	try {
        const cookieValue = await getCookies('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.vistorManagement.getVisitorDetailsById.path,
			type: listUrl.vistorManagement.getVisitorDetailsById.type,
			data: {
				visitorGuid: visitorGuid,
			},
			_token: cookieValue as string,
		})
		const result: IResponse<GetVisitorDto> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}
