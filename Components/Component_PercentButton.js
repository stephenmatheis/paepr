/** RHC-C SharePoint Team */

/* Global Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_PercentButton(param) {
    const {
        parent,
        color,
        percent,
        action
    } = param;
    
    return Component({
        html: /*html*/ `
            <div class='percent-button' style='background: ${color};'>${percent}%</div>
        `,
        style: /*css*/ `
            .percent-button {
                cursor: pointer;
                margin-right: 10px;
                padding: 5px;
                width: 65px;
                text-align: center;
                font-size: 1em;
                font-weight: 500;
                color: ${App.secondaryColor};
                border-radius: 4px;
                border:  ${App.defaultBorder};
            }
        `,
        parent,
        position: 'beforeend',
        events: [
            {
                selector: '#id.percent-button',
                event: 'click',
                listener: action
            }
        ]
    });
}