/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/** @todo if user is normally day/mid shift but marked themselves night shift yesterday, update entry on accountability set -> pull in all accountability items with Shift === 'Night' */

export default async function Model_Roster(param) {
    const {
        roster
    } = param;

    function formatDate(d = new Date()) {
        var mm = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
        var dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate(); 
     
        return d.getFullYear() + "-" + mm + "-" + dd; // Return ISO date string
    }

    function formatTime(operator, time, date) {
        return `(Date ${operator} datetime'${formatDate(date)}T${time}')`;
    }

    function getYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() -1);

        return yesterday;
    }

    function getStatusSortOrder(status) {
        return status ? statuses.find(item => item.Status === status).SortOrder : 0;
    }

    const todayStatuses = await Action_Get({
        list: 'Accountability',
        /** greater than or equal to 12:00 AM this morning and less than or equal to 11:59 PM tonight */
        filter: `${filter ? `${filter} and `: ''}${formatTime('ge', '00:00:00')} and ${formatTime('le', '23:59:59')}`,
        orderby: 'Id desc'
    });

    // console.log(todayStatuses);
    
    const nightShiftStatuses = await Action_Get({
        list: 'Accountability',
        /** greater than or equal to 12:00 AM this morning and less than or equal to 11:59 PM tonight */
        filter: `${filter ? `${filter} and `: ''}ShiftStatus eq 'Night' and ${formatTime('ge', '00:00:00', getYesterday())} and ${formatTime('le', '23:59:59', getYesterday())}`,
        orderby: 'Id desc'
    });

    // console.log(nightShiftStatuses);

    const statuses = await Action_Get({
        list: 'Statuses'
    });

    return roster.map(user => {
        const {
            Id,
            LastName,
            FirstName,
            Section,
            Category,
            Rank,
            Account,
            ActiveShift,
            ShiftStart,
            ShiftEnd,
            Role
        } = user;

        /** Get Accountability item */
        /** @todo check for night shift status in nightShiftStatuses */
        const Status = todayStatuses.find(item => item.Account === Account);
        
        /** Always make sure Status === 'Not Accounted For' is sorted at top */
        const StatusSortOrder = Status ? getStatusSortOrder(Status.Status) : 0;

        return {
            Id,
            Account,
            Section,
            LastName,
            FirstName,
            Category,
            Rank,
            Status: Status ? Status.Status : 'Not Accounted For',
            /** For datatables orthongonal data api {@link https://datatables.net/reference/option/columns.data}*/
            // StatusSort: Status ? Status.Status : '0', /** Always make sure Status === 'Not Accounted For' is sorted at top */
            StatusSortOrder,
            Shift: Status ? Status.ShiftStatus : ActiveShift,
            // Time: Status ? new Date(Status.Date).toLocaleTimeString('default', {timeStyle: 'short'}) : '',
            Time: Status ? Status.Date : '',
            /** @todo what if marked by was an admin who is not in this section? */
            MarkedBy: Status ? roster.find(item => item.Account === Status.MarkedBy).FullName : ''
        }
    });
}
