/** RHC-C SharePoint Team */

/** Actions */
import Action_History from './Action_History.js'

/** Settings */
import Setting_App from '../Settings/Setting_App.js'
import Setting_Routes from '../Settings/Setting_Routes.js'

export default function Action_Route(path = Setting_App.defaultRoute, options = {}) {
    const {
        scrollTop
    } = options;

    /** Get appcontainer */
    const appContainer = App.store.get('appcontainer');

    /** Get Sidebar */
    const sidebar = App.store.get('sidebar');

    /** Get maincontainer */
    const mainContainer = App.store.get('maincontainer');

    /** Set scroll top */
    App.ViewScrollTop = mainContainer.get().scrollTop;

    /** Remove all events */
    mainContainer.removeEvents();

    /** Turn Padding On (default) */
    mainContainer.paddingOn();

    /** Remove components from DOM */
    mainContainer.empty();

    /** Empty component store */
    App.store.empty();

    /** Re-add maincontainer to store */
    App.store.add({
        name: 'appcontainer',
        component: appContainer
    });

    /** Re-add maincontainer to store */
    App.store.add({
        name: 'maincontainer',
        component: mainContainer
    });

    /** Re-add sidebar to store */
    App.store.add({
        name: 'sidebar',
        component: sidebar
    });

    /** Set browswer history state */
    Action_History({
        url: `${location.href.split('#')[0]}${(path) ? `#${path}` : ''}`,
        title: `${App.title}${(path) ? ` - ${path}` : ''}`
    });

    /** Check route path */
    const query = path.split('?')[1];
    const pathParts = path.split('?')[0].split('/');

    /** Only select first path, remove any ? that might be passed in */
    const route = Setting_Routes.find(item => item.path === pathParts[0]);

    if (!route) {
        App.route('404');
    }

    sidebar.selectNav(route.path);

    /** Call .go() method */
    route.go(pathParts, query);

    /** Set Scroll Top */
    /** @todo this needs to run only after all async calls have completed */
    /** @note maybe Views should always return a promise? */
    /** @note or could just use a callback passed to the view */
    if (scrollTop) {
        console.log(scrollTop);

        App.store.get('maincontainer').get().scrollTo({
            top: scrollTop
        });
    }
}
