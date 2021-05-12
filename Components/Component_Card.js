/** RHC-C SharePoint Team */

/* Components */
import Action_Component from '../Actions/Action_Component.js'

export default function Component_Card(param) {
    const {
        title,
        titleColor,
        border,
        background,
        padding,
        minWidth,
        parent,
        position,
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <div class='round-card'>
                <div class='round-card-title'>${title}</div>
            </div>
        `,
        style: /*css*/ `
            #id.round-card {
                display: inline-flex;
                flex-direction: column;
                background: ${background || 'white'};
                padding: ${padding || '20px'};
                min-width: ${minWidth || 'initial'};
                border-radius: 4px;
                /* border: ${App.defaultBorder}; */
                border: ${border || 'solid 1px rgba(0, 0, 0, .05)'};
            }

            #id .round-card-title {
                font-size: 1.5em;
                font-weight: 700;
                color: ${titleColor || App.defaultColor};
            }
        `,
        parent,
        position,
        events: [
            
        ]
    });

    return component;
}