/** RHC-C SharePoint Team */

/* Actions */
import Action_Component from '../Actions/Action_Component.js'

export default function Component_RequestAssitanceInfo(param) {
    const {
        parent,
        position
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <div class='request-assitance-info'>
                Please call the <strong>DHA Global Service Center (GSC)</strong> at <strong>1 (800) 600-9332</strong> or <a href='https://dashboard-gsc.health.mil/webservices/Page1D.cfm' target='_blank'>submit a ticket</a>.
            </div>
        `,
        style: /*css*/ `
            /* 
            #id a {
                color: ${App.defaultColor};
                border-bottom: solid 2px ${App.defaultColor};
            }

            #id a:focus,
            #id a:active,
            #id a:hover {
                color: ${App.defaultColor};
                text-decoration: none;
            }

            #id a:hover {
                border-bottom: solid 2px ${App.primaryColor};
            }
            */
        `,
        parent: parent,
        position,
        events: [

        ]
    });

    return component
}