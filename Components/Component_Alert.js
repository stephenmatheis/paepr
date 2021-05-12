/** RHC-C SharePoint Team */

import Component from '../Actions/Action_Component.js'

/**
 * @link https://getbootstrap.com/docs/4.0/components/alerts/
 * 
 * @param {Object} param 
 */
export default function Component_Alert(param) {
    const {
        type,
        text,
        close,
        margin,
        width,
        parent,
        position
    } = param;

    const component = Component({
        html: /*html*/ `
            <div class='alert alert-${type}' role='alert'${margin ? ` style='margin: ${margin};'` : ''}>
                ${text}
                ${close ? 
                    /*html*/ ` 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    ` 
                    : ''
                }
            </div>
        `,
        style: /*css*/ `
            #id * {
                color: inherit;
            }
            
            ${width ? 
                /*css*/ `
                    #id {
                        width: ${width};
                    }
                ` :
                ''
            }
        `,
        parent,
        position
    });

    component.update = (param) => {
        const {
            type: newType,
            text: newText
        } = param;

        const alert = component.get();

        if (type) {
            alert.classList.remove(`alert-${type}`);
            alert.classList.add(`alert-${newType}`);
        }

        if (text) {
            alert.innerHTML = newText;
        }
    }

    return component;
}