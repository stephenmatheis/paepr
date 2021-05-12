
(async function(){

    const Origin = location.origin
    const Path = location.pathname.split('/SiteAssets')[0]
    const API = '/_api/web'
    const SiteCollectionApiUrl = Origin + Path + API
    
    const SiteCollection = await $.ajax({
        url: SiteCollectionApiUrl,
        method: 'GET',
        dataType: 'json',
        data: { $select: '*', $expand: 'Lists' },
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json; odata=verbose"
        },
    }).then(data => data.d)

    const AccountabilityList = SiteCollection.Lists.results.find(list => list.Title.includes('Accountability'))
    const CurrentCount = AccountabilityList.ItemCount
    const ListUri = AccountabilityList.__metadata.uri

    console.info(CurrentCount)
    console.info(ListUri)

})();

export default function Monitor(MonitorOptions, List, Route, Callback){
    
    const interval = MonitorOptions.interval ? MonitorOptions.interval : 30000
    const url = List.__metadata.uri
    
    setInterval(async function(){
        // console.info(window.navigator.userActivation.hasBeenActive)
        // console.info(window.navigator.userActivation.isActive)
        if( window.navigator.userActivation.hasBeenActive ){

            const NewItemCount = await Route.Get(url, { $select: 'ItemCount' }).then(data => data.d.ItemCount)

            if( NewItemCount > List.ItemCount ){

                // window.location.reload()
                console.info('This list needs to be updated')

                // Toggle the refresh;
                // _App.refreshTable()
                    
                // Set the new ItemCount;
                // SharePointWebs.getListDetails('accountability').ItemCount = response.d.ItemCount
            }
        }

    }, interval)
}