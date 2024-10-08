export function formatDtmLong(dtm) {
    return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(new Date(dtm * 1000));
}

export function formatDtmShort(dtm, country_code = 'default') {
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
