/** RHC-C SharePoint Team */

import Component from '../Actions/Action_Component.js'

export default function Component_MissingView(options) {
    const {
        parent,
        position
    } = options;

    return Component({
        html: /*html*/ `
            <div>404</div>
        `,
        style: /*css*/ `
            
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}