export interface GetFacilityBookingList {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
    userGUID: string;
}

export interface CreateFacilityBooking {
    facilityId: string;
    startDate: string;
    endDate: string;
    numOfGuest: number;
    userGUID: string;
}
