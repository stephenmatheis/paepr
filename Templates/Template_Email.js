/** RHC-C SharePoint Team */

export default async function Template_Email(param) {
    const {
        body
    } = param;

    return /*html*/ `
        <html>
        <head>
            <style>
                * {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
            </style>
        </head>
        <body>
            ${body}
        </body>
        </html>
    `
}
