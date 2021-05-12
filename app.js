/** RHC-C SharePoint Team */

/* Config */
import Config from './config.js'

/* Actions */
import Action_Store from './Actions/Action_Store.js'
import Action_CreateItem from './Actions/Action_CreateItem.js'
import Action_GetCurrentUser from './Actions/Action_GetCurrentUser.js'
import Action_Route from './Actions/Action_Route.js'

/* Components */
import Component_SvgDefs from './Components/Component_SvgDefs.js'
import Component_SideBar from './Components/Component_SideBar.js'
import Component_AppContainer from './Components/Component_AppContainer.js'
import Component_MainContainer from './Components/Component_MainContainer.js'

/** Add new string method */
String.prototype.toTitleCase = function () {
    return this
        .toLowerCase()
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
}

window.replaceErrors = (key, value) => {
    if (value instanceof Error) {
        var error = {};

        Object.getOwnPropertyNames(value).forEach(function (key) {
            error[key] = value[key];
        });

        return error;
    }

    return value;
}

/** Implement global error callback */
// window.onerror = async (message, source, lineno, colno, error) => {
//     try {
//         const data = {
//             Message: message,
//             Error: JSON.stringify(error, replaceErrors),
//             URL: source,
//             Line: lineno,
//             Column: colno,
//             UserTitle: App.user.Account,
//             UserEmail: App.user.Email
//         };

//         Action_CreateItem({
//             list: 'Errors',
//             data,
//             notify: false,
//             updateList: false
//         });

//         return false;
//     } catch(e) {
//         console.log(e);
//     }
// }

/** Start app on page load */
window.onload = async () => {
    /** Get config.js */
    const {
        title,
        primaryColor,
        primaryColorRGB,
        secondaryColor,
        defaultRoute,
        gradientColor,
        webApp,
        userList,
        userFields,
        info,
        css,
        scripts,
        routes,
        svgSymbols,
        onLoad,
    } = Config;

    /** Set unique Id counter start value */
    let idCounter = 0;              

    /** Global properties and methods */
    window.App = {
        title,
        webApp,
        info,
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        defaultColor: 'darkslategray;',
        // defaultBorder: 'solid 1px lightgray',
        defaultBorder: 'solid 1px rgba(0, 0, 0, .1)',
        defaultRoute,
        primaryColor,
        primaryColorRGB,
        secondaryColor,
        gradientColor,
        gradientColorLight: '#43CBFF',
        gradientColorDark: '#9708CC',
        highlightColor: '#f6b73c',
        store: Action_Store(),
        getNextId() {
            return `App-${idCounter++}`; 
        }
    };
    
    /** Load svg definitions */
    const svgDefs = Component_SvgDefs({
        svgSymbols
    });

    svgDefs.add();

    /** Run Config.onLoad */
    if (onLoad) {
        onLoad();
    }

    /** Get AD user and userList item properties */
    App.user = await Action_GetCurrentUser({
        list: userList,
        fields: userFields
    });

    /** Add App Container to #app */
    const appContainer = Component_AppContainer();

    App.store.add({
        name: 'appcontainer',
        component: appContainer
    });

    appContainer.add();

    /** Get current route */
    const path = location.href.split('#')[1];

    /** Attach Router to browser back/forward event */
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            App.route(event.state.url.split('#')[1], {
                scrollTop: App.ViewScrollTop
            });
        }
    });

    // Add SideBar Component;
    const sideBar = Component_SideBar({
        parent: appContainer,
        path
    });

    App.store.add({
        name: 'sidebar',
        component: sideBar
    });

    sideBar.add();

    // Add Main Container;
    const mainContainer = Component_MainContainer({
        parent: appContainer
    });

    App.store.add({
        name: 'maincontainer',
        component: mainContainer
    });

    mainContainer.add();

    /** Log succesful login */
    // try {
    //     Action_CreateItem({
    //         list: 'Log',
    //         notify: false,
    //         updateList: false,
    //         data: {
    //             Category: 'Login',
    //             Message: JSON.stringify(App.data.user),
    //             UserAccount: App.data.user.account,
    //             UserEmail: App.data.user.email,
    //             UserName: App.data.user.fullName,
    //             UserRole: App.data.user.role,
    //             SourceFile: 'app.js'
    //         }
    //     });
    // } catch (error) {
    //     const data = {
    //         Message: 'Login Error',
    //         Error: JSON.stringify(error, replaceErrors),
    //         URL: 0,
    //         Line: 0,
    //         Column: 0,
    //         UserTitle: App.data.user.account,
    //         UserEmail: App.data.user.email
    //     };

    //     Action_CreateItem({
    //         list: 'Errors',
    //         data,
    //         notify: false,
    //         updateList: false
    //     });
    // }

    /** Run current route on page load */
    Action_Route(path); 
}
