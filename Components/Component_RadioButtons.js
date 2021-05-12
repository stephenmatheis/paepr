/** RHC-C SharePoint Team */

/* Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_NewRequestForm(param) {
    const {
        label,
        description,
        buttons,
        onSetValue,
        parent,
        position
    } = param;

    const component = Component({
        html: /*html*/ `
            <div class='form-field'>
                <div class='form-field-label'>${label}</div>
                ${description ? /*html*/`<div class='form-field-description'>${description}</div>` : ''}
                <div class='form-field-radio-options'>
                    ${createRadioOptions()}
                </div>
            </div>
        `,
        style: /*css*/ `
            .form-field {
                margin-bottom: 20px;
            }

            .form-field-label {
                font-size: 1.1em;
                font-weight: bold;
                padding: 5px 0px;
            }

            #id .form-field-description {
                padding: 5px 0px;
            }

            .form-field-radio-options {
                display: flex;
                flex-direction: row;
            }

            .radio {
                user-select: none;
                cursor: pointer;
                font-weight: 500;
                padding: 5px 10px;
                background: white;
                margin: 5px 10px 5px 0px;
                border-radius: 4px;
                border:  ${App.defaultBorder};
            }

            .radio:focus,
            .radio-active {
                outline: none;
                background: ${App.primaryColor};
                color: ${App.secondaryColor};
            }

            .radio-selected {
                background: ${App.primaryColor};
                color: ${App.secondaryColor};
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: '#id .radio',
                event: 'click',
                listener: selectRadio
            }
        ]
    });

    function createRadioOptions() {
        let html = '';

        buttons.forEach(button => {
            const {
                id,
                value
            } = button;

            html += /*html */ `
                <div class='radio' data-itemid='${id}'>${value}</div>
            `;
        });

        return html;
    }

    function selectRadio (event) {
        const radioButtons = component.findAll('.radio');

        radioButtons.forEach(button => {
            button.classList.remove('radio-selected');
        });

        event.target.classList.add('radio-selected');

        if (onSetValue) {
            onSetValue();
        }
    }

    component.value = (param) => {
        const field = component.find('.radio-selected');

        if (param) {
            field.innerText = param;
        } else {
            return field.innerText;
        }
    }

    return component
}