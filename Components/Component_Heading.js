/** RHC-C SharePoint Team */

import Action_Component from '../Actions/Action_Component.js'

export default function Component_Heading(param) {
    const {
        text,
        size,
        height,
        weight,
        margin,
        padding,
        parent,
        align
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <div class='heading'>
                <div class='text'>${text}</div>
            </div>
        `,
        style: /*css*/ `
            #id {
                height: ${height || 'unset'};
                display: flex;
                align-items: center;
                margin: ${margin || '50px 0px 20px 0px'};
                padding: ${padding || '0px'};
            }    

            #id .text {
                font-size: ${size || '2em'};
                font-weight: ${weight || '400'};
                color: ${window.App.primaryColor};
                margin: 0px;
                text-align: ${align || 'left'};
            }
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            
        ]
    });

    component.setHeading = (newTitle) => {
        component.find('.text').innerText = newTitle;
    }

    return component;
}