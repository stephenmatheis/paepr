/** RHC-C SharePoint Team */

import Action_Component from '../Actions/Action_Component.js'

export default function Component_CommandsDashboard(param) {
    const {
        title,
        commands,
        parent,
        position
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <div class='commands-dashboard-container'>
                <div class='commands-dashboard'>
                    ${buildListOfCommands()}
                </div>
            </div>
        `,
        style: /*css*/ `
            #id {
                position: relative;
                width: 100%;
                padding-left: 15px;
                margin-bottom: 20px;
            }

            #id .commands-dashboard {
                display: flex;
            }

            /** Group */
            #id .commands-dashboard-group {
                width: 100%;
                display: flex;
                flex-direction: column;
                background: white;
                padding: 10px 15px;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .commands-dashboard-group[data-label='Accepted'] .commands-dashboard-group-label * {
                color: seagreen;
            }

            #id .commands-dashboard-group[data-label='Not accepted'] .commands-dashboard-group-label * {
                color: crimson;
            }

            #id .commands-dashboard-group:not(:last-child) {
                margin-right: 20px;
            }

            /** Column */
            #id .commands-dashboard-column {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            /** Label */
            #id .commands-dashboard-group-label {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-weight: 500;
                font-size: 1.2em;
                white-space: nowrap;
            }

            #id .commands-dashboard-group-count {
                margin-left: 15px;
            }

            /** Command */
            #id .commands-dashboard-command {
                font-size: .8em;
                white-space: nowrap;
                margin-bottom: 8px;
            }

            #id .commands-dashboard-command-name {
                font-weight: 500;
            }

            /** Close */
            #id .commands-dashboard-close {
                font-weight: 400;
                font-size: 2em;
                z-index: 1000;
                cursor: pointer;
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 1em;
                color: ${App.defaultColor};
            }
        `,
        parent,
        position,
        events: [

        ]
    });

    function buildListOfCommands() {
        const {
            accepted,
            unAccepted
        } = commands;
        
        return /*html*/ `
            ${commandRowTemplate(accepted, 'Accepted')}
            ${commandRowTemplate(unAccepted, 'Not accepted')}
        `;
    }

    function commandRowTemplate(commands, label) {
        let html = /*html*/ `
            <div class='commands-dashboard-group' data-label='${label}'>
                <div class='commands-dashboard-group-label'>
                    <span>${label}</span>
                    <span class='commands-dashboard-group-count'>${commands.length}</span>
                </div>
                <div class='commands-dashboard-column'>
        `

        commands.sort().forEach(item => {
            if (label === 'Not accepted') {
                html += /*html*/ `
                    <div class='commands-dashboard-command'>
                        <div class='commands-dashboard-command-name'>${item}</div>
                    </div>
                `;
            } else if (label === 'Accepted') {
                const {
                    command,
                    event
                } = item;

                html += /*html*/ `
                    <div class='commands-dashboard-command'>
                        <div class='commands-dashboard-command-name'>${command}</div>
                        <div class='commands-dashboard-command-event'>${event}</div>
                    </div>
                `;
            }
        });

        html += /*html*/`
                </div>
            </div>
        `

        return html;
    }

    return component;
}