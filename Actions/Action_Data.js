/** RHC-C SharePoint Team */

/* Actions */
import Action_Get from './Action_Get.js'

/* Components */
import Component_LoadingBar from '../Components/Component_LoadingBar.js'

export default async function Data(param) {
    const {
        getListsOnLoad
    } = param;

    const loadingBar = Component_LoadingBar({
        displayTitle: App.title,
        displayText: 'Loading',
        totalCount: getListsOnLoad.length
    });

    loadingBar.add();

    const getLists = await Promise.all(getListsOnLoad.map(param => {
        const {
            list,
            label,
            select,
            expand,
            orderby
        } = param;

        return Action_Get({
            list,
            select,
            expand,
            orderby,
            action() {
                loadingBar.update({
                    newDisplayText: label
                });
            }
        });
    }));

    await loadingBar.end();

    const lists = {}

    getListsOnLoad.forEach((param, index) => {
        const {
            list
        } = param;

       lists[list] = getLists[index];
    });

    // if (userItem) {
    //     try {
    //         data.user.Id = userItem.Id;
    //         data.user.role = userItem.FK_Role;
    //     } catch(error) {
    //         const errorData = {
    //             Message: `Error adding properties to user.`,
    //             Error: JSON.stringify(error, replaceErrors),
    //             URL: 'Data.js',
    //             Line: 0,
    //             Column: 0,
    //             UserTitle: data.user.account,
    //             UserEmail: data.user.email
    //         };
    
    //         CreateItem({
    //             list: 'Errors',
    //             data: errorData
    //         });
    //     }
    // } else {
    //     data.user.role = 'Requestor';

    //     const errorData = {
    //         Message: `No user account`,
    //         Error: '',
    //         URL: 'Data.js',
    //         Line: 0,
    //         Column: 0,
    //         UserTitle: user.account,
    //         UserEmail: user.email
    //     };

    //     CreateItem({
    //         list: 'Errors',
    //         data: errorData,
    //         notify: false
    //     });
    // }

    return lists
}
