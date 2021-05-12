/** RHC-C SharePoint Team */

import Component from '../Actions/Action_Component.js'

export default function Component_VersionBanner(param) {
    const {
        version,
        width
    } = param;

    return Component({
        html: /*html*/ `
            <div class='version-banner'>${version}</div>
        `,
        style: /*css*/ `
            .version-banner {
                cursor: default;
                position: fixed;
                top: 5px;
                right: 15px;
                padding: 5px;
                font-size: 1em;
                background: lightyellow;
                border-left: solid 4px gold;
                border-radius: 4px;
                border:  ${App.defaultBorder};
                ${width ? `width: ${width};` : ''}
            }
        `
    });
}