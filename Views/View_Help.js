/** RHC-C SharePoint Team */

/* Components */
import Component_Title from '../Components/Component_Title.js'
import Component_Heading from '../Components/Component_Heading.js'
import Component_Alert from '../Components/Component_Alert.js'
import Component_Text from '../Components/Component_Text.js';
import Component_RequestAssitanceInfo from '../Components/Component_RequestAssitanceInfo.js';

export default async function View_Help() {
    const parent = App.store.get('maincontainer');

    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `Help`,
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();

    /** User Guide Heading */
    const userGuideHeading = Component_Heading({
        text: 'User guides',
        margin: '20px 0px',
        parent
    });

    userGuideHeading.add();

    /** Alert */

    const infoAlert = Component_Alert({
        type: 'info',
        text: 'User guides coming soon!',
        parent
    });

    infoAlert.add();

    // const userGuideLink = Component_Text({
    //     text: /*html*/ `
    //         <a href='#' target='_blank'>Download user guide</a>
    //     `,
    //     parent
    // });

    // userGuideLink.add();

    /** Request assitance Heading */
    const requestAssistanceHeading = Component_Heading({
        text: 'Request Assitance',
        margin: '50px 0px 20px 0px',
        parent
    });

    requestAssistanceHeading.add();

    const requestAssistanceInfo = Component_RequestAssitanceInfo({
        parent
    });

    requestAssistanceInfo.add();
}
