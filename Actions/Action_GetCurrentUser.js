/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/** Data */
import Data_User from '../Data/Data_User.js'

/** Settings */
import Setting_App from '../Settings/Setting_App.js'

export default async function Action_GetCurrentUser(param) {
    const {
        list,
        fields
    } = param;

    const url = `../../_api/web/CurrentUser`;
    const fetchOptions = {
        headers : { 
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; odata=verbose'
        }
    };

    if (Setting_App.dev) {
        return Data_User;
    }

    try {
        const currentUser = await fetch(url, fetchOptions);
        const response = await currentUser.json();
        const account = response.d.LoginName.split('\\')[1];
        const appUser = await Action_Get({
            list: list || 'Users',
            select: fields,
            filter: `Account eq '${account}'`
        });
    
        return appUser[0];
    } catch (error) {
        console.log(error);
    }
}
