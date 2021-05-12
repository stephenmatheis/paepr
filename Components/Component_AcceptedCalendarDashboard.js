/** RHC-C SharePoint Team */

import Action_Component from '../Actions/Action_Component.js'

export default function Component_AcceptedCalendarDashboard(param) {
    const {
        groups,
        title,
        size,
        weight,
        padding,
        parent,
        align,
        action
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <div class='accepted-calendar-dashboard'>
                <div class='accepted-calendar-dashboard-title'>${title}</div>
                <div class='accepted-calendar-dashboard-groups'>
                    ${buildDashboard()}
                </div>
            </div>
        `,
        style: /*css*/ `
            #id {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: ${padding || '0px 0px 0px 15px'};
            }    

            #id .accepted-calendar-dashboard-title {
                font-size: ${size || '1.5em'};
                font-weight: ${weight || '400'};
                color: ${App.primaryColor};
                padding: 4.25px;
                text-align: ${align || 'left'};
            }

            /** Dashboard Groups */
            #id .accepted-calendar-dashboard-groups {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin: 20px 0px;
            }

            #id .dashboard-banner-group {
                cursor: pointer;
                flex: 1;
                padding: 10px 15px;
                border-radius: 4px;
                /* border: solid 1px rgba(0, 0, 0, .05); */
                border: solid 1px ${App.primaryColor};
            }

            #id .dashboard-banner-group:not(:last-child) {
                margin-right: 20px;
            }

            #id .dashboard-banner-label {
                font-weight: 500;
            }

            #id .dashboard-banner-label,
            #id .dashboard-banner-description {
                white-space: nowrap;
                /* font-size: .8em; */
            }

            #id .dashboard-banner-value {
                font-size: 1.5em;
                font-weight: 500;
            }

            #id .dashboard-banner-value span {
                color: ${App.primaryColor};
            }

            #id .dashboard-banner-value-count,
            #id .dashboard-banner-value-total {
                display: inline-block;
                min-width: 20px
            }

            #id .dashboard-banner-value-count {
                text-align: right;
            }

            #id .dashboard-banner-value-total {
                text-align: left;
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

            /** Toggle color  */
            
            .opposite * {
                color: white !important;
            }

            .opposite {
                position: relative;
                background: ${App.primaryColor} !important;
            }

            /* 
            .opposite::after {
                position: absolute;
                z-index: 100;
                background: ${App.secondaryColor};
                content: ' ';
                height: 20px;
                width: 20px;
                border-radius: 4px;
            }

            .opposite::before {
                position: absolute;
                z-index: 100;
                background: ${App.primaryColor};
                content: ' ';
                height: 20px;
                width: 20px;
            }

            .square-right {
                border-radius: 4px 4px 0px 0px !important;
            }

            .square-right::after {
                bottom: -1px;
                right: -21px;
            }

            .square-right::before {
                bottom: -10px;
                right: -10px;
            }

            .square-left {
                border-radius: 4px 4px 0px 0px !important;
            }

            .square-left::after {
                bottom: -1px;
                left: -21px;
            }

            .square-left::before {
                bottom: -10px;
                left: -10px;
            }

            #id .dashboard-banner-group:not(.opposite) {
                margin-bottom: 20px;
            }

            */
           
            /** Footer */
            #id .dashboard-banner-footer {

            }

            #id .dashboard-banner-footer * {
                font-size: .9em;
                color: ${App.primaryColor};
            }
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            {
                selector: '#id .dashboard-banner-group',
                event: 'click',
                listener: action
            }
        ]
    });

    function buildDashboard() {
        let html = '';

        groups.forEach(item => {
            const {
                label,
                count,
                total,
                description,
                color,
                background
            } = item;

            html += /*html*/ `
                <div class='dashboard-banner-group' style='background: ${background || 'transparent'}' data-label='${label}'>
                    <div class='dashboard-banner-label' style='color: ${color || App.defaultColor}'>${label}</div>
                    <div class='dashboard-banner-value'>
                        <span class='dashboard-banner-value-count'>${count}</span>
                        <span>/</span>
                        <span class='dashboard-banner-value-total'>${total}</span>
                    </div>
                    <div class='dashboard-banner-description' style='color: ${color || App.defaultColor}'>${description || ''}</div>
                    <div class='dashboard-banner-footer'>
                        <span class='dashboard-banner-value-open-count'>0</span>
                        <span>available</span>
                    </div>
                </div>
            `;
        });
        
        return html;
    }

    component.updateCount = (param) => {
        const {
            count,
            label
        } = param;

        component.find(`.dashboard-banner-group[data-label='${label}'] .dashboard-banner-value-count`).innerText = count;
    }

    component.updateOpenCount = (param) => {
        const {
            count,
            label
        } = param;

        component.find(`.dashboard-banner-group[data-label='${label}'] .dashboard-banner-value-open-count`).innerText = count;
    }

    component.toggleColor = (group, toggle) => {
        if (toggle) {
            group.classList.add('opposite');

            // const groups = component.findAll('.dashboard-banner-group');
            
            // groups.forEach((node, index) => {
            //     if (node === group) {
            //         if (index === 0) {
            //             node.classList.add('square-right');
            //         } else {
            //             node.classList.add('square-left');
            //         }
            //     }
            // });

        } else {
            group.classList.remove('opposite');
            // group.classList.remove('square-left', 'square-right');
        }
    }

    component.setTitle = (newTitle) => {
        component.find('.accepted-calendar-dashboard-title').innerText = newTitle;
    }

    return component;
}