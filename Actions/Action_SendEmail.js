/** RHC-C SharePoint Team */

/** Actions */
import Action_GetRequestDigest from './Action_GetRootRequestDigest.js'

/** Templates */
import Template_Email from '../Templates/Template_Email.js'

export default async function Action_SendEmail(param) {
    const {
        From,
        To,
        CC,
        Subject,
        Body
    } = param;

    // console.log(From);
    // console.log(To);

    const requestDigest = await Action_GetRequestDigest();
    const headers = {
        "Accept": "application/json;odata=verbose",
        "Content-type": "application/json; odata=verbose",
        "X-RequestDigest": requestDigest,
    }

    /** {@link https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/jj171404(v=office.15)} */
    const properties = {
        'properties': {
            __metadata: {
                type: 'SP.Utilities.EmailProperties'
            },
            From: From,
            To: {
                results: To
            },
            CC: {
                results: CC || []
            },
            Body,
            Subject: Subject
        }
    };

    const response = await fetch('/_api/SP.Utilities.Utility.SendEmail', {
        method: 'POST',
        headers,
        body: JSON.stringify(properties)
    });

    return response;
}