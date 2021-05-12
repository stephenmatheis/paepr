/** RHC-C SharePoint Team */

/** Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_DashboardBanner(param) {
    const {
        data,
        direction,
        fixed,
        margin,
        parent,
        position
    } = param;

    const component = Component({
        html: /*html*/ `
            <div class='dashboard-banner ${fixed ? 'fixed' : ''}'>
                ${buildDashboard()}
            </div>
        `,
        style: /*css*/ `
            #id {
                /* margin: ${margin || '20px'}; */
                margin: ${margin || '20px 0px'};
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
                /* display: flex; */
                display: flex;
                flex-direction: ${direction || 'row'};
                justify-content: space-between;
            }

            #id .dashboard-banner-group {
                flex: 1;
                padding: 10px 15px;
                border-radius: 4px;
            }

            ${direction === 'column' ?
                /*css*/ ` 
                    #id .dashboard-banner-group:not(:last-child) {
                        margin-bottom: 10px;
                    }        
                `
                :
                /*css*/ `
                    #id .dashboard-banner-group:not(:last-child) {
                        margin-right: 10px;
                    }    
                `
            }

            #id .dashboard-banner-label,
            #id .dashboard-banner-description {
                white-space: nowrap;
                font-size: .9em;
            }

            #id .dashboard-banner-value {
                font-size: 2.5em;
                font-weight: 500;
            }

            /** Fixed */
            #id.fixed {
                position: fixed;
                top: 0;
                right: 0;
                height: 60%;
                margin: 20% 10px;
                flex-direction: column;
            }

            #id .dashboard-banner-group.fixed:not(:last-child) {
                margin: 10px 0px;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [

        ]
    });

    function buildDashboard() {
        let html = '';

        data.forEach(item => {
            const {
                label,
                value,
                description,
                color,
                background
            } = item;

            html += /*html*/ `
                <div class='dashboard-banner-group ${fixed ? 'fixed' : ''}' style='background: ${background || 'transparent'}' data-label='${label}'>
                    <div class='dashboard-banner-label' style='color: ${color || App.defaultColor}'>${label}</div>
                    <div class='dashboard-banner-value' style='color: ${color || App.defaultColor}'>${value}</div>
                    <div class='dashboard-banner-description' style='color: ${color || App.defaultColor}'>${description || ''}</div>
                </div>
            `;
        });
        
        return html;
    }

    component.update = (groups) => {
        groups.forEach(item => {
            const {
                label,
                value,
                description,
            } = item;

            const valueField = component.find(`.dashboard-banner-group[data-label='${label}'] .dashboard-banner-value`);

            if (valueField) {
                valueField.innerText = value;
            }

            const descriptionField = component.find(`.dashboard-banner-group[data-label='${label}'] .dashboard-banner-description`);

            if (descriptionField) {
                descriptionField.innerText = description;
            }
        });
    }

    component.fixed = (state) => {
        if (state) {
            component.get().classList.add('fixed');
            component.findAll('.dashboard-banner-group').forEach(group => {
                group.classList.add('fixed');
            });

        } else {
            component.get().classList.remove('fixed');
            component.findAll('.dashboard-banner-group').forEach(group => {
                group.classList.remove('fixed');
            });
        }
    }

    return component;
}