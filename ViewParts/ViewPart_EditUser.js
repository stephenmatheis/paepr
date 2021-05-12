/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/* Components */
import Component_SingleLineTextField from '../Components/Component_SingleLineTextField.js'
import Component_EmailField from '../Components/Component_EmailField.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_MultiSelectCheckbox from '../Components/Component_MultiSelectCheckbox.js'

/**
 * ViewPart_EditUser
 * @description
 * @returns {Object} - @method {getFieldValues} call that return values for User
 */
export default async function ViewPart_EditUser(param) {
    const {
        user,
        parent
    } = param;

    const {
        FirstName,
        MiddleName,
        LastName,
        Account,
        Email,
        Command,
        Group,
        Role
    } = user;

    /** Firsts Name */
    const firstNameField = Component_SingleLineTextField({
        label: 'First name',
        description: '',
        value: FirstName,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
    });

    firstNameField.add();

    /** Middle Name */
    const middleNameField = Component_SingleLineTextField({
        label: 'Middle name',
        description: '',
        value: MiddleName,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        optional: true,
        parent,
    });

    middleNameField.add();

    /** Last Name */
    const lastNameField = Component_SingleLineTextField({
        label: 'Last name',
        description: '',
        value: LastName,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
    });

    lastNameField.add();
    
    /** Account */
    const accountField = Component_SingleLineTextField({
        label: 'Account',
        description: '',
        value: Account,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
        async onFocusout(event) {
            const account = accountField.value();
            
            if (account && account !== '')  {
                const userItem = await Action_Get({
                    list: 'Users',
                    select: 'Id,Account',
                    filter: `Account eq '${account}'`
                });

                if (userItem[0]) {
                    accountField.addError('A user with this account already exists');
                } else {
                    accountField.removeError();    
                }
            } else {
                accountField.removeError();
            }
        }
    });

    accountField.add();
    
    /** Email */
    const emailField = Component_EmailField({
        description: 'Example: name@mail.mil. Leave blank if team member does not have an @mail.mil account.',
        value: Email,
        width: '350px',
        domains: [ '@mail.mil' ],
        parent,
    });

    emailField.add();

    /** Command */
    const commandField = Component_DropDownField({
        list: 'Commands',
        label: 'Command',
        value: Command,
        required: true,
        dropDownOptions: await Action_Get({ list: 'Commands' }).then(data => data.map(item => {
            const { Id, Command } = item;
            return { id: Id, value: Command };
        })),
        width: '100px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    commandField.add();

    /** Get user's available groups */
    const allowedSwitchGroupsItems = await Action_Get({
        list: 'AllowedSwitchGroups',
        filter: `Account eq '${Account}'`
    });

    const groups = allowedSwitchGroupsItems.map(item => item.Group);

    /** Allowed Groups */
    const allowedGroupsField = Component_MultiSelectCheckbox({
        label: 'Which groups does this person belong to?',
        // description: '',
        width: '100%',
        options: [
            {
                title: '',
                items:  await Action_Get({
                    list: 'Groups'
                })
                .then(data => data.map(item => {
                    const {
                        Id, 
                        Group 
                    } = item;
        
                    return {
                        id: Id,
                        value: Group,
                        checked: groups.includes(Group) || false
                    };
                }))
            }
        ],
        async onCheck(event) {
            /** Is Checked */
            const isChecked = event.target.checked;

            /** Value */
            const value = event.target.dataset.value;

            /** Reset group field */
            if (!isChecked && value === groupField.value()) {
                groupField.value('');
            }

            /** Set options */
            groupField.setOptions({
                options: allowedGroupsField.checked()
            });
        },
        parent
    });

    allowedGroupsField.add();

    /** Group */
    const groupField = Component_DropDownField({
        list: 'Groups',
        label: 'Group',
        value: Group,
        required: true,
        dropDownOptions: allowedGroupsField.checked(),
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    groupField.add();

    /** Role */
    const roleField = Component_DropDownField({
        list: 'Roles',
        label: 'Role',
        value: Role,
        required: true,
        dropDownOptions: await Action_Get({ list: 'Roles' }).then(data => data.map(item => {
            const { Id, Role } = item;
            return { id: Id, value: Role };
        })),
        width: '100px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    roleField.add();

    return {
        getAllowedGroups() {
            const newGroups = allowedGroupsField.value();

            /** 
             * Get added and removed values
             * {@link https://stackoverflow.com/a/33034768}
             * Difference - arr1.filter(x => !arr2.includes(x));
             * Symmetric difference - groups.filter(x => !newGroups.includes(x)).concat(newGroups.filter(x => !groups.includes(x)));
             */
            const added = newGroups.filter(group => !groups.includes(group));
            const removed = groups
                .filter(group => !newGroups.includes(group))
                .map(group => allowedSwitchGroupsItems.find(item => item.Group === group));

            if (added.length > 0 || removed.length > 0) {
                return {
                    added,
                    removed
                }
            } else {
                return false;
            }

        },
        getFieldValues() {
            const data = {};

            if (firstNameField.value() !== FirstName) {
                /** @todo field.chagned() */
                data.FirstName = firstNameField.value();
            }

            if (MiddleName && middleNameField.value() !== MiddleName) {
                /** @todo field.chagned() */
                data.MiddleName = middleNameField.value();
            }

            if (lastNameField.value() !== LastName) {
                /** @todo field.chagned() */
                data.LastName = lastNameField.value();
            }

            if (accountField.value() !== Account) {
                /** @todo field.chagned() */
                data.Account = accountField.value();
            }

            if (emailField.value() !== Email) {
                /** @todo field.chagned() */
                data.Email = emailField.value();
            }

            if (commandField.value() !== Command) {
                /** @todo field.chagned() */
                data.Command = commandField.value();
            }

            if (groupField.value() !== Group) {
                /** @todo field.chagned() */
                data.Group = groupField.value();
            }

            if (roleField.value() !== Role) {
                /** @todo field.chagned() */
                data.Role = roleField.value();
            }

            if (Object.keys(data).length === 0 && data.constructor === Object) {
                return false;
            } else {
                return data;
            }
        }
    };
}
