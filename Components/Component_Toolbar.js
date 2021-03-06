/** RHC-C SharePoint Team */

/* Global Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_Toolbar(param) {
    const {
        justify,
        margin,
        parent,
        position
    } = param;

    return Component({
        html: /*html*/ `
            <div class='toolbar'>
            
            </div>
        `,
        style: /*css*/ `
            #id.toolbar {
                display: inline-flex;
                flex-direction: row;
                justify-content: ${justify || 'flex-end'};
                border-radius: 4px;
                /* padding: 10px; */
                margin: ${margin || '15px 0px'};
                background: white;
                border:  ${App.defaultBorder};
            }
        `,
        parent: parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}