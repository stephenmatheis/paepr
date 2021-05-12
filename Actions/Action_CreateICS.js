/** RHC-C SharePoint Team */

export default function Action_CreateICS(param) {
    const {
        item,
        list,
        method,
        organizer,
        location,
        description
    } = param;

    const {
        Id,
        FK_Command,
        FK_Group,
        EventDate,
        EndDate,
        SEQUENCE
    } = item;

    /** ICS date format: yyyymmddThhmmssZ */
    function formatDate(date) {
        const event = new Date(date).toISOString().split('T');
        const yyyymmdd = event[0].split('-').join('');
        const hhmmss = event[1].split('.')[0].split(':').join('');

        return `${yyyymmdd}T${hhmmss}Z`;
    }

    const SUMMARY = `${FK_Group} - ${FK_Command}`;
    const DSTART = formatDate(EventDate);
    const DTEND = formatDate(EndDate);

    /** 
     * {@link https://tools.ietf.org/html/rfc5546}
     * {@link https://www.kanzaki.com/docs/ical}
     */
    const ics =
    `BEGIN:VCALENDAR\n` +
    `VERSION:2.0\n` +
    `PRODID:-//RHC-C SharePoint Team//${App.title}//EN\n` +
    `METHOD:${method || 'REQUEST'}\n` +
    `BEGIN:VEVENT\n` +
    `ORGANIZER:${organizer}\n` +
    `DTSTART:${DSTART}\n` +
    `DTEND:${DTEND}\n` +
    `DTSTAMP:${formatDate(new Date())}\n` +
    `STATUS:CONFIRMED\n` +
    `LOCATION;ENCODING=8BIT;CHARSET=utf-8:${location || ''}\n` +
    `SEQUENCE:${SEQUENCE}\n` +
    `SUMMARY;ENCODING=8BIT;CHARSET=utf-8:${SUMMARY}\n` +
    `UID:List=${list},ItemId=${Id}\n` +
    `${(`X-ALT-DESC;FMTTYPE=text/html:
        <html>
        <head>
        </head>
        <body>
        <div style="font-family: 'Calibri', sans-serif; font-size:11pt;">
        ${description}
        <div>
        </body>
        </html>`).replace(/\n/g, "\\n")}\n` +
    `BEGIN:VALARM\n` +
    `TRIGGER:-PT15M\n` +
    `ACTION:DISPLAY;\n` +
    `DESCRIPTION:Reminder\n` +
    `CATEGORIES:Red Category\n` +
    `END:VALARM\n` +
    `END:VEVENT\n` +
    `END:VCALENDAR\n`;

    /** File name */
    // const fileName = `${SUMMARY} - ${SEQUENCE}.ics`;
    const fileName = `${SEQUENCE}.ics`;

    /** Create File object */
    const icsFile = new File([ics], fileName, {type: 'text/plain'});

    return icsFile;
}