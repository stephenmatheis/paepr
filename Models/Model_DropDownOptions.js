/** RHC-C SharePoint Team */

export default async function Model_DropDownOptions(param) {
    const {
        data,
        field
    } = param;
    
    return data.map(item => {
        return {
            id: item.Id,
            value: item[field] 
        };
    });
}
