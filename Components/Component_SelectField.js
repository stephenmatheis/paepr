/** RHC-C SharePoint Team */

/* Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_SelectField(param) {
    const {
        label,
        parent,
        position
    } = param;

    const component = Component({
        html: /*html*/ `
            <div class='form-field'>
                <label class='form-field-label'>${label}</label>
                <select class='form-field-select'>
                    ${buildOptions()}
                </select>
            </div>
        `,
        style: /*css*/ `
            /* Rows */
            #id.form-field {
                margin-bottom: 20px;
            }

            /* Labels */
            #id .form-field-label {
                font-size: 1.1em;
                font-weight: bold;
            }

            #id .form-field-time {
                font-weight: 500;
                margin-top: 2px;
                margin-bottom: 4px;
                padding: 5px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .form-field-time:active,
            #id .form-field-time:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }
        `,
        parent: parent,
        position,
        events: [

        ]
    });

    component.value = (param) => {
        const field = component.find('.form-field-time');

        if (param) {
            // field.value = new Date(param).toISOString().split('T')[1];
        } else {
            return field.value;
        }
    }

    return component
}