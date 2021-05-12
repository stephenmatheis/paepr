/** RHC-C SharePoint Team */

/* Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_MultiLineTextField(param) {
    const {
        label,
        labelSize,
        description,
        value,
        readOnly,
        placeHolder,
        parent,
        position,
        minHeight,
        width,
        fieldMargin,
        onFocusout
    } = param;

    const component = Component({
        html: /*html*/ `
            <div class='form-field'>
                ${label ? /*html*/`<div class='form-field-label'>${label}</div>` : ''}
                ${description ? /*html*/`<div class='form-field-description'>${description}</div>` : ''}
                ${readOnly ? /*html*/ `<div class='form-field-multi-line-text readonly'>${value || placeHolder}</div>` : /*html*/ `<div class='form-field-multi-line-text editable' contenteditable='true'>${value || ''}</div>`}
            </div>
        `,
        style: /*css*/ `
            #id.form-field {
                margin: ${fieldMargin || '0px 0px 20px 0px'};
                /* ${!description ? 'width: 100%' : ''}; */
                width: 100%;
            }

            #id .form-field-label {
                font-size: ${labelSize || '1.1em'};
                font-weight: bold;
                /* padding-left: 5px;
                padding-top: 5px; */
                padding: 5px 0px;
            }

            #id .form-field-description {
                font-size: 1em;
                font-weight: 400;
                padding-left: 5px;
                padding-top: 5px;
                margin-bottom: 15px;
            }

            #id .form-field-multi-line-text {
                font-size: 1em;
                font-weight: 500;
                margin-top: 2px;
                margin-bottom: 4px;
            }

            #id .form-field-multi-line-text.editable {
                min-height: ${minHeight || `300px`};
                width: ${width || 'unset'};
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .form-field-multi-line-text.editable:active,
            #id .form-field-multi-line-text.editable:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }

            /** Readonly */
            #id .form-field-multi-line-text.readonly {
                user-select: none;
                background: transparent;
                border: solid 1px rgba(0, 0, 0, .05);
                padding: 10px;
                background: white;
                border-radius: 4px;
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: '#id .form-field-multi-line-text.editable',
                event: 'focusout',
                listener: onFocusout
            }
        ]
    });

    component.focus = () => {
        const field = component.find('.form-field-multi-line-text');

        field.focus();
    }

    component.value = (param) => {
        const field = component.find('.form-field-multi-line-text');

        if (param !== undefined) {
            field.innerHTML = param;
        } else {
            return field.innerHTML;
        }
    }

    return component
}