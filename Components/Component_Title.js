/** RHC-C SharePoint Team */

import Component from '../Actions/Action_Component.js'

/**
 * 
 * @param {object} param 
 * 
 * @example Component({
 *     title: 'Test',
 *     parent: someOtherComponent
 * });
 * 
 * @returns {Object} Component.
 */
export default function Component_Title(param) {
    const {
        title,
        subTitle,
        margin,
        parent,
        date,
        type
    } = param;

    /**
     * @todo show ticking time
     */
    
    const component = Component({
        html: /*html*/ `
            <div class='title ${type || ''}'>
                <div class='title-subtitle'>
                    <h1>${title}</h1>
                    ${subTitle !== undefined ? `<h2>${subTitle}</h2>` : ''}
                </div>
                ${date !== undefined ? `<div class='title-date'>${date}</div>` : ''}
            </div>
        `,
        style: /*css*/ `
            #id {
                margin: ${margin || '0px'};
            }

            #id .title-subtitle {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: baseline;
            }

            #id.title h1 {
                font-size: 2.5em;
                font-weight: 300;
                color: ${App.primaryColor};
                margin-top: 0px;
                margin-bottom: 10px;
            }

            #id.title h2 {
                font-size: 1.7em;
                font-weight: 400;
                color: ${App.primaryColor};
                margin: 0px;
            }

            #id.title .title-date {
                font-size: 1.3em;
                font-weight: 400;
                color: ${App.primaryColor};
                margin: 0px;
            }

            #id.title .title-date * {
                color: ${App.primaryColor};
            }

            #id.across {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;
                flex-wrap: wrap;
                white-space: nowrap;
            }

            #id.across h2 {
                margin: 0px 50px;
            }
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            
        ]
    });

    component.setDisplayText = (text) => {
        const title = component.find('h1');

        title.innerHTML = text;
    }

    component.setSubtitle = (text) => {
        const title = component.find('h2');

        title.innerHTML = text;
    }

    component.setDate = (text) => {
        const title = component.find('.title-date');

        title.innerHTML = text;
    }

    return component;
}