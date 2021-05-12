/** RHC-C SharePoint Team */

/* Global Actions */
import Component from '../Actions/Action_Component.js'

export default function Component_Container(param) {
    const {
        align,
        background,
        border,
        borderBottom,
        borderLeft,
        borderRight,
        borderTop,
        display,
        flex,
        flexwrap,
        shadow,
        direction,
        height,
        justify,
        margin,
        padding,
        parent,
        position,
        radius,
        width,
        maxWidth,
        minWidth,
        overflow,
        userSelect,
    } = param;

    return Component({
        html: /*html*/ `
            <div class='container'></div>
        `,
        style: /*css*/ `
            #id {
                user-select: ${userSelect || 'initial'};
                -webkit-user-select: ${userSelect || 'initial'};
                -moz-user-select: ${userSelect || 'initial'};
                -ms-user-select: ${userSelect || 'initial'};
                background: ${background || 'none'};
                flex-wrap: ${flexwrap || 'unset'};
                flex-direction: ${direction || 'row'};
                justify-content: ${justify || 'flex-start'};
                align-items: ${align || 'flex-start'};
                height: ${height || 'unset'};
                width: ${width || 'unset'};
                max-width: ${maxWidth || 'unset'};
                min-width: ${minWidth || 'unset'};
                margin: ${margin || '0'};
                padding: ${padding || '0'};
                border-radius: ${radius || 'unset'};
                border-top: ${borderTop || 'none'};
                border-right: ${borderRight || 'none'};
                border-bottom: ${borderBottom || 'none'};
                border-left: ${borderLeft || 'none'};
                border: ${border || 'initial'};
                box-shadow: ${shadow || 'none'};
                overflow: ${overflow || 'initial'};
                flex: ${flex || 'unset'};
                display: ${display || 'flex'};
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}