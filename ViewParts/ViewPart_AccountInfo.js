/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** Components */
import Component_Card from '../Components/Component_Card.js'
import Component_SingleLineTextField from '../Components/Component_SingleLineTextField.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_FormButton from '../Components/Component_FormButton.js'

export default async function View_AccountInfo(param) {
    const {
        parent,
    } = param;

    const accountInfoCard = Component_Card({
        title: 'My Account Information',
        titleColor: App.primaryColor,
        padding: '20px 0px',
        background: App.secondaryColor,
        border: 'none',
        parent
    });

    accountInfoCard.add();

    const {
        Id,
        FirstName,
        LastName,
        Account,
        Role,
        Section,
        Category,
        Rank
    } = App.user;

    /** First Name */
    const firstNameField = Component_SingleLineTextField({
        label: 'First name',
        value: FirstName,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    firstNameField.add();

    /** Last Name */
    const lastNameField = Component_SingleLineTextField({
        label: 'Last name',
        value: LastName,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    lastNameField.add();
    
    /** Account */
    const accountField = Component_SingleLineTextField({
        label: 'Account',
        value: Account,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    accountField.add();

    /** Catgegory */
    const categoryField = Component_SingleLineTextField({
        label: 'Catgegory',
        value: Category,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    categoryField.add();

    /** Section */
    const sectionField = Component_SingleLineTextField({
        label: 'Section',
        value: Section,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    sectionField.add();

    // /** Get user's available groups */
    // const allowedSwitchGroupsItems = await Action_Get({
    //     list: 'AllowedSwitchGroups',
    //     filter: `Account eq '${Account}'`
    // });

    // /** Group */
    // const groupField = Component_DropDownField({
    //     list: 'Groups',
    //     label: 'Group',
    //     width: '100%',
    //     value: Group,
    //     required: true,
    //     editable: false,
    //     dropDownOptions: allowedSwitchGroupsItems.map(item => {
    //         const {
    //             Id,
    //             Group
    //         } = item;
            
    //         return {
    //             id: Id,
    //             value: Group 
    //         };
    //     }),
    //     fieldMargin: '0px',
    //     parent: accountInfoCard,
    //     onSetValue(data) {
    //         if (groupField.value() !== Group) {
    //             switchGroupButton.enable();
    //         } else {
    //             switchGroupButton.disable();
    //         }
    //     }
    // });

    // groupField.add();

    // /** Button */
    // const switchGroupButton = Component_FormButton({
    //     type: 'update',
    //     value: 'Switch Group',
    //     margin: '10px 0px',
    //     disabled: true,
    //     parent: accountInfoCard,
    //     async action(event) {
    //         /* Disable button and set value */
    //         switchGroupButton
    //             .disable()
    //             .setValue(/*html*/ `
    //                 <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
    //                 <span style='padding-left: 5px;'>Switching group</span>
    //             `);
            
    //         /** Update User */
    //         await Action_UpdateItem({
    //             list: 'Users',
    //             itemId: Id,
    //             data: {
    //                 Group: groupField.value()
    //             }
    //         });

    //         /** Refresh page */
    //         location.href = location.href.split('#')[0];
    //     }
    // });

    // switchGroupButton.add();
}
