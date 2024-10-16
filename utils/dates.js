export function formatDtmLong(dtm) {
    return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(new Date(dtm * 1000));
}

export function formatDtmShort(dtm, country_code = navigator.language || navigator.userLanguage) {
    return new Intl.DateTimeFormat(country_code, {dateStyle: 'short'}).format(new Date(dtm * 1000));
}

export function daysUntilDtm(dtm) {
    // Convert the current date and time to a timestamp
    const now = new Date().getTime() / 1000; // Convert milliseconds to seconds

    // Calculate the difference in seconds
    const diffInSeconds = dtm - now;

    // Convert seconds to days (1 day = 86400 seconds)
    const daysRemaining = Math.ceil(diffInSeconds / 86400);

    return daysRemaining;
}

export function formatDateForDatepicker(date = new Date()) {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year}-${month.length == 1 ? '0' + month : month }-${day.length == 1 ? '0' + day : day}`;
}
