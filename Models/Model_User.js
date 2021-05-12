/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/** @todo if user is normally day/mid shift but marked themselves night shift yesterday, update entry on accountability set -> pull in all accountability items with Shift === 'Night' */

export default async function Model_Roster(param) {
    const {
        User,
        Status
    } = param;

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
    } = User;

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
}
