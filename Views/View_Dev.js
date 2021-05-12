/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'
// import Action_GetADUsers from '../Actions/Action_GetADUsers.js'

/** Components */
import Component_Title from '../Components/Component_Title.js'
import Component_DashboardBanner from '../Components/Component_DashboardBanner.js'
import Component_Timer from '../Components/Component_Timer.js'

export default async function View_Admin() {
    if (App.user.Account !== 'stephen.matheis') {
        App.route('403');
    }

    const parent = App.store.get('maincontainer');
    const viewTitle = Component_Title({
        title: App.title,
        subTitle: 'Admin',
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();

    let run = false;

    const timer = Component_Timer({
        parent,
        onStart() {
            run = true;
            console.log(`Run: ${run}`);

            update();
        },
        onStop() {
            run = false;
            console.log(`Run: ${run}`);
        },
        onReset() {
            console.log('reset');
        }
    });

    timer.add();

    async function update() {
        const roster = await Action_Get({
            list: 'Roster',
            filter: `Role ne 'User'`
        });

        console.log(roster);

        for (const user of roster) {
            if (run) {
                const updatedUser = await Action_UpdateItem({
                    list: 'Roster',
                    itemId: user.Id,
                    data: {
                        Role: 'User'
                    }
                });

                console.log(`${updatedUser.Account} role set to ${updatedUser.Role}`);
            } else {
                console.log('stoped');
                
                break;
            }
        }
    }
}
