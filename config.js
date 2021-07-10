/** RHC-C SharePoint Team */

/** Views */
import View_Dev from './Views/View_Dev.js'
import View_Settings from './Views/View_Settings.js'
import View_403 from './Views/View_403.js'
import View_404 from './Views/View_404.js'
import View_Help from './Views/View_Help.js'
import View_Dashboard from './Views/View_Dashboard.js'

export default {
    title: 'Project Request',
    primaryColor: 'mediumslateblue',
    primaryColorRGB: '123, 104, 238',
    secondaryColor: 'ghostwhite',
    defaultRoute: 'MyProjects',
    webApp: 'https://rhcc.amedd.army.mil',
    /** Runs after window.App is created in window.onload and before the selected View */
    onLoad() { 

    },
    userList: 'Roster',
    userFields: 'Id,FullName,LastName,FirstName,Category,Rank,Section,Account,ActiveShift,ShiftStart,ShiftEnd,Role',
    routes: [
        {
            path: 'MyProjects',
            icon: 'list',
            go() {
                View_Dashboard();
            }  
        },
        {
            path: 'Help',
            icon: 'question',
            go() {
                View_Help();
            }
        },
        {
            path: 'Settings',
            icon: 'cog',
            go() {
                View_Settings();
            }
        },
        {
            path: '403',
            hide: true,
            go() {
                View_403();
            }
        },
        {
            path: '404',
            hide: true,
            go() {
                View_404();
            }
        },
        {
            path: 'Dev',
            hide: true,
            go() {
                View_Dev();
            }
        }
    ]
}
