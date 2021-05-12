/** RHC-C SharePoint Team */

/* Actions */
import Component from '../Actions/Action_Component.js'
 
export default function Component_NewButton(options) {
    const id = `${options.id}-new-button`;

    return Component({
        type: 'newbutton',
        html: /*html*/ `
            <span id=${id} class='new-button' >
                <!-- &plus; Add new ${options.newLabel} -->
                ${options.icon}
            </span>
        `,
        style: /*css*/ `
            .new-button {
                cursor: pointer;
                font-size: 1.5em;
            }

            /* Icon plus */
            .new-button .plus {
                stroke: ${App.primaryColor};
                fill: ${App.primaryColor};
            }
        `,
        parent: options.parent, // #TODO: remove hard coded class
        root: options.root,
        position: options.position || 'beforeend',
        events: [
            {
                selector: `#${id}`,
                event: 'click',
                listener: showNewForm
            }
        ]
    });

    function showNewForm(event) {
        App.route(`${options.list}/NewForm`);
    }
}