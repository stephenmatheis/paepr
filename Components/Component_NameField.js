/** RHC-C SharePoint Team */

/* Actions */
import Action_Component from '../Actions/Action_Component.js'
import Action_GetAdUsers from '../Actions/Action_GetAdUsers.js'

/* Components */
import Component_DropDownMenu from './Component_DropDownMenu.js'

export default function Component_NameField(param) {
    const {
        label,
        description,
        parent,
        position,
        onSetValue
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <div class='form-field'>
                <div class='form-field-label'>${label}</div>
                ${description ? /*html*/`<div class='form-field-description'>${description}</div>` : ''}
                <div class='form-field-name' tabindex='0' contenteditable='true'></div>
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
                padding: 5px 0px;
            }

            #id .form-field-description {
                font-size: .9em;
                padding: 5px 0px;
            }

            #id .form-field-name {
                font-size: .9em;
                font-weight: 500;
                margin-top: 2px;
                margin-bottom: 4px;
                min-height: 36px;
                padding: 5px 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .form-field-name:active,
            #id .form-field-name:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: `#id .form-field-name`,
                event: 'input',
                listener(event) {
                    /** Show empty drop down immediately */
                    // addDropDownMenu(event);
                    
                    /**
                     * @author Stephen Matheis
                     * @date 2020.10.28
                     * 
                     * Trying to fix menu not going away.
                     * 
                     * This does the trick, and I think I know why.
                     * But more research is necessary before I feel
                     * this is the best way to do it.
                     */
                    if (event.isTrusted) {
                        searchSiteUsers(event);
                    }
                }
            }
        ]
    });

    let menu;

    function addDropDownMenu(event, data) {
        const key = event.key;

        if (key && key.includes('Arrow') || key === 'Enter') {
            event.preventDefault();

            return;
        }

        // Reset menu
        resetMenu();
        
        // Set menu
        menu = Component_DropDownMenu({
            dropDownField: component,
            form: component.get(),
            field: event.target,
            data: data,
            onSetValue
        });

        // Add to DOM
        menu.add();
    }

    /** Reset menu */
    function resetMenu() {
        if (menu) {
            menu.removeEvents();
            menu.remove();
        }
    }

    /** Search site users */
    let queries = [];

    async function searchSiteUsers(event) {
        event.preventDefault();
        
        /** Abort previous queries */ 
        queries.forEach(query => {
            query.abortController.abort();
        });

        const query = event.target.innerText.toLowerCase();

        if (query === '') {
            event.target.dataset.itemid = '';
            
            resetMenu();

            return;
        }
 
        const newSearch = Action_GetAdUsers({
            query
        });

        queries.push(newSearch);

        const response = await newSearch.response;

        if (response) {
            const data = response.map(user => {
                const name = user.Title;
                const account = user.LoginName.split('|')[1];

                return {
                    id: user.Id,
                    value: `${name} - ${account}`,
                    info: user
                };
            });

            if (data.length > 0) {
                addDropDownMenu(event, data);
            }
        }
    }

    component.focus = () => {
        const field = component.find('.form-field-name');

        field.focus();
    }

    component.addError = (param) => {
        component.removeError();
        
        let text = typeof param === 'object' ? param.text : param;

        const html = /*html*/ `
            <div class='alert alert-danger' role='alert'>
                ${text}
                ${param.button ? 
                    /*html*/ ` 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    ` 
                    : ''
                }
            </div>
        `;

        component.find('.form-field-name').insertAdjacentHTML('beforebegin', html);
    }

    component.removeError = () => {
        const message = component.find('.alert');

        if (message) {
            message.remove();
        }
    }

    component.value = (param) => {
        const nameField = component.find(`.form-field-name`);

        if (param) {
            nameField.innerText = param;
        } else if (param === '') {
            nameField.innerText = '';
        } else {
            const nameAndAccount = nameField.innerText.replace(' (US)', '').split(' - ');
            const fullName = nameAndAccount[0];
            const nameParts = fullName.split(', ');
            const lastName = nameParts[0];
            const firstNameParts = nameParts[1].split(' ');
            const firstName = firstNameParts[0];
            const command = firstNameParts[firstNameParts.length - 1];
            const accountParts = nameAndAccount[1].split('\\');
            const domain = accountParts[0];
            const account = accountParts[1];

            return {
                fullName,
                lastName,
                firstName,
                domain,
                account,
                command
            };
        }
    }

    return component;
}