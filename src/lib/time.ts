import moment from 'moment-timezone'

export const convertDateStringToDate = (dateString: string) => {
    if(!dateString) return ;
    const date = moment(dateString).tz('Asia/Kuala_Lumpur').toDate()
    return date;
}

export const convertLocalDateStringToUTCString = (localDateString: string, dateFormat: string) => {
    if(!localDateString) return "";
    const UTCString = moment(localDateString).utc().format(dateFormat)
    return UTCString;
}

export const convertUTCStringToLocalDateString = (UTCString: string, dateFormat: string) => {
    if(!UTCString) return "";
    const localDateString = moment.utc(UTCString).tz("Asia/Kuala_Lumpur").format(dateFormat)
    return localDateString;
}

export const convertUTCStringToLocalDate = (UTCString: string) => {
    const localDate = moment.utc(UTCString).tz("Asia/Kuala_Lumpur").toDate()
    return localDate;
}

export const getTodayDate = () => {
    const todayDate = moment().tz("Asia/Kuala_Lumpur").toDate()
    return todayDate;
}

export const getLocalDateString = (date: Date, dateFormat: string) => {
    if(date === null) return '';
    const dateString = moment(date).tz("Asia/Kuala_Lumpur").format(dateFormat)
    return dateString
}

export const getUTCDateString = (date: Date, dateFormat: string) => {
    if(date === null) return '';
    const dateString = moment(date).utc().format(dateFormat)
    return dateString
}

export const getUTCRelativeTimeFromNow = (date: Date)  => {
    if(date === null) return '';
    const relativeTime = moment.utc(date).tz("Asia/Kuala_Lumpur").fromNow();
    return relativeTime;
}
