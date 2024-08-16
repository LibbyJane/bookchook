export function formatDtmLong(dtm) {
    return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(new Date(dtm * 1000));
}

export function formatDtmShort(dtm, country_code) {
    return new Intl.DateTimeFormat(country_code, {dateStyle: 'short'}).format(new Date(dtm * 1000));
}