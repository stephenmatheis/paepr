/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from './Action_Get.js'

export default function Action_Poll(param) {
    const {
        action
    } = param;

    let timeOut;
    let poll;

    poll = setInterval(startPoll, 5000);

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);

    function resetTimer() {
        if (!poll) {
            poll = setInterval(startPoll, 5000);
            timeOut = setTimeout(logout, 60 * 60 * 1000); // 60 minutes;
        }

        clearTimeout(timeOut);
    }

    function logout() {
        clearTimeout(poll);

        if (confirm("Still here?")) {
            resetTimer();
        
            poll = setInterval(startPoll, 5000);
        } else {
            clearTimeout(poll);
        }
    }

    function startPoll() {
        const filter = `?$filter=(Account eq '${SP.getUserAccount()}') and (StatusValue ne 'Deleted')`;

        xhr({
            method: 'GET',
            url: location.href.split("SiteAssets")[0] + "_vti_bin/ListData.svc/Users" + filter,
            success: (data) => {
                getRoles(data[0].Id);
            }
        });
    }

    return poll;
}