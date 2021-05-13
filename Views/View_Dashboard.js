/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/** Components */
import Component_Container from '../Components/Component_Container.js'
import Component_DataTable from '../Components/Component_DataTable.js'
import Component_DashboardBanner from '../Components/Component_DashboardBanner.js'
import Component_FoldingCube from '../Components/Component_FoldingCube.js'
import Component_PieChart from '../Components/Component_PieChart.js'
import Component_Title from '../Components/Component_Title.js'

/** Data */
import Data_Requests from '../Data/Data_Requests.js'
import Data_Statuses from '../Data/Data_Statuses.js'

export default async function View_Dashboard() {
    /** View Parent **********************************************************/
    
    const parent = App.store.get('maincontainer');

    /** View Title ***********************************************************/
    
    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `Dashboard`,
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();

    /** Loading Indicator ****************************************************/

    const loadingIndicator = Component_FoldingCube({
        label: 'Loading Dashboard',
        margin: '40px 0px',
        parent
    });
    
    loadingIndicator.add();

    /** View Container *******************************************************/

    const viewContainer = Component_Container({
        display: 'block',
        margin: '20px 0px',
        parent
    });

    viewContainer.add();

    /** Banner ***************************************************************/

    function toPercent(num, den) {
        const percentage = num / den; 

        if (percentage <= 0.009 && percentage > 0) {
            return '<1';
        } else {
            return Math.round((num / den) * 100);
        }
    }

    function toCiel(num, den) {
        return Math.ceil((num / den.length) * 100);
    }

    function toFloor(num, den) {
        return Math.floor((num / den.length) * 100);
    }

    let bannerData = [
        {
            label: 'Requests',
            value: Data_Requests.length
        },
        {
            label: 'One Time',
            value: Data_Requests.filter(item => item.Frequency === 'One Time').length
        },
        {
            label: 'Recurring',
            value: Data_Requests.filter(item => item.Frequency === 'Recurring').length
        }
    ];

    Data_Statuses.forEach(item => {
        const {
            Status,
            Color
        } = item;

        const count = Data_Requests.filter(item => item.Status === Status).length;

        bannerData.push({
            label: Status,
            value: count,
            description: `${toPercent(count, Data_Requests.length)}%`,
            color: Color ? 'white' : null,
            background: Color
        }); 
    });

    bannerData.unshift();

    const dashboard = Component_DashboardBanner({
        margin: '20px 0px',
        data: bannerData,
        parent: viewContainer
    });

    dashboard.add();

    /** Table ****************************************************************/

    const teamTable = Component_DataTable({
        headers: [
            'Requestor',
            'Department',
            'Purpose',
            'Frequency',
            'Status',
            'Suspense Date',
            'Submitted Date'
        ],
        // striped: false,
        // border: false,
        // paging: false,
        // search: false,
        width: '100%',
        columns: [
            {
                data: 'Requestor',
                type: 'string'
            },
            {
                data: 'Department',
                type: 'string'
            },
            {
                data: 'Purpose',
                type: 'string'
            },
            {
                data: 'Frequency',
                type: 'string'
            },
            {
                data: 'Status',
                type: 'string'
            },
            {
                data: 'SuspenseDate',
                type: 'date',
                render(data, type, row) {
                    return data ? new Date(data).toLocaleDateString('default', {dateStyle: 'short'}) : ''
                }
            },
            {
                data: 'SubmittedDate',
                type: 'date',
                render(data, type, row) {
                    return data ? new Date(data).toLocaleDateString('default', {dateStyle: 'short'}) : ''
                }
            },
            {
                data: 'Id',
                visible: false,
            }
        ],
        data: Data_Requests,
        rowId: 'Id',
        order: [[ 1, 'desc' ], [0, 'asc' ]],
        onRowClick(param) {
            const {
                row,
                item
            } = param;

            console.log(param);
        },
        rowCallback: function(row, data) {
            const {
                Progress
            } = data;

            if (Progress === 100) {
                row.classList.add('table-success');
            }
        },
        parent: viewContainer
    });

    teamTable.add();

    /** Remove Loading Indication ********************************************/

    loadingIndicator.remove();
}
