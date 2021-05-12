/** RHC-C SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/* Components */
import Component_FoldingCube from '../Components/Component_FoldingCube.js'
import Component_Container from '../Components/Component_Container.js'
import Component_NameField from '../Components/Component_NameField.js'
import Component_SingleLineTextField from '../Components/Component_SingleLineTextField.js'
import Component_EmailField from '../Components/Component_EmailField.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_MultiSelectCheckbox from '../Components/Component_MultiSelectCheckbox.js'
import Component_FieldMessage from '../Components/Component_FieldMessage.js'
import Component_Alert from '../Components/Component_Alert.js'

export default async function ViewPart_NewUser(param) {
    const {
        parent
    } = param;

    // const infoAlert = Component_Alert({
    //     type: 'info',
    //     text: /*html*/ `
    //         <h4 class='alert-heading'>Coming soon!</h4>
    //         <hr>
    //         <p class='mb-0'>Please continue testing other features while the development team works on this one. We appreciate your patience and understanding!</p>
    //     `,
    //     parent
    // });

    // infoAlert.add();

    // return;

    /** Loading */
    const loadingIndicator = Component_FoldingCube({
        label: 'Loading new user form',
        margin: '40px 0px',
        parent
    });
    
    loadingIndicator.add();

    /** Get Teams */
    const teams = await Action_Get({ list: 'Teams' }).then(data => data.map(item => {
        const { Id, Team } = item;
        return { id: Id, value: Team };
    }));

    /** Get Categories */
    const categories = await Action_Get({ list: 'Categories' }).then(data => data.map(item => {
        const { Id, Category } = item;
        return { id: Id, value: Category };
    }));

    /** Get Ranks */
    const ranks = await Action_Get({ list: 'Ranks' }).then(data => data.map(item => {
        const { Id, Abbreviation } = item;
        return { id: Id, value: Abbreviation };
    }));

     /** Paygrades */
     const gsPayGrades = await Action_Get({ list: 'GSPayGrades' }).then(data => data.map(item => {
        const { Id, Abbreviation } = item;
        return { id: Id, value: Abbreviation };
    }));

    /** Get Roles */
    const roles =  await Action_Get({ list: 'Roles' }).then(data => data.map(item => {
        const { Id, Role } = item;
        return { id: Id, value: Role };
    }));

    loadingIndicator.remove();

    /** Collect all field messages */
    let messages = [];

    /** Name Container */
    const fullNameContainer = Component_Container({
        direction: 'column',
        parent
    });

    fullNameContainer.add();

    /** Search Name */
    const nameField = Component_NameField({
        label: 'Search name',
        description: `Enter a <i>Last Name, First Name</i>. Then select a name from the resulting list to automatically fill <i>First</i> and <i>Last name</i>, <i>Account</i>, <i>Email</i>, and <i>Command</i> fields.`,
        parent: fullNameContainer,
        async onSetValue(data) {
            const {
                account,
                command,
                firstName,
                lastName,
            } = nameField.value();

            /** Check if account exists */
            if (account !== '')  {
                const userItem = await Action_Get({
                    list: 'Roster',
                    select: 'Id,Account',
                    filter: `Account eq '${account}'`
                });

                if (userItem[0]) {
                    nameField.value('');

                    const link = `${location.href.split('#')[0]}#Users/${userItem[0].Id}`

                    nameField.addError({
                        button: true,
                        text: /*html*/ `
                            An account for this user already exists. <a href='${link}' target='_blank' class='alert-link'>Click here to view it.</a> Or search for another name.
                        `
                    });

                    return;
                } else {
                    nameField.removeError();
                }
            }

            /** Set first and last name, account, email, and command fields */
            firstNameField.value(firstName.toTitleCase());
            lastNameField.value(lastName.toTitleCase());
            accountField.value(account);
        }
    });
    
    nameField.add();

    /** Name Container */
    const nameContainer = Component_Container({
        align: 'flex-end',
        parent: fullNameContainer
    });

    nameContainer.add();

    /** First Name */
    const firstNameField = Component_SingleLineTextField({
        label: 'First name',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent: nameContainer
    });
    
    firstNameField.add();

    /** Middle Name */
    const middleNameField = Component_SingleLineTextField({
        label: 'Middle name',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        optional: true,
        parent: nameContainer
    });
    
    middleNameField.add();

    /** Last Name */
    const lastNameField = Component_SingleLineTextField({
        label: 'Last name',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent: nameContainer
    });
    
    lastNameField.add();
    
    /** Account */
    const accountField = Component_SingleLineTextField({
        label: 'Account',
        description: '',
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

    /** Team */
    const teamTield = Component_DropDownField({
        list: 'Teams',
        label: 'Team',
        required: true,
        dropDownOptions: teams,
        width: '250px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    teamTield.add();

    /*********************************** */

    /** Pay Grade Container */
    const categoryContainer = Component_Container({
        align: 'flex-end',
        parent
    });

    categoryContainer.add();

    /** Category */
    let categoryMessage;

    const categoryField = Component_DropDownField({
        list: 'Categories',
        label: 'Category',
        description: 'Select a Category',
        required: true,
        dropDownOptions: categories,
        width: '75px',
        fieldMargin: '0px 20px 20px 0px',
        parent: categoryContainer,
        focusout(event) {
            if (event.target.innerText === '') {
                /** Remove Pay Grade empty */
                payGradeField.value('');

                /** Disable Pay Grade */
                payGradeField.disable();
            }
        },
        async onSetValue(data) {
            const {
                previousValue,
                newValue
            } = data;

            const newCategory = newValue.Category;

            /** Set list and options */
            payGradeField.setOptions(getPayGradeParameters(newCategory));
            
            /** Enable field */
            payGradeField.enable();
            
            if (previousValue) {
                /** Empty Pay Grade field */
                payGradeField.value('');

                /** Add message if category changed */
                if (previousValue !== newCategory) {
                    if (categoryMessage) {
                        categoryMessage.remove();
                    }
    
                    categoryMessage = Component_FieldMessage({
                        message: `Category changed from ${previousValue}. Please select a new Pay Grade.`,
                        margin: '0px 10px 24px 0px',
                        parent: categoryContainer
                    });
    
                    categoryMessage.add();
                    messages.push(categoryMessage);
                }
            }
        }
    });

    categoryField.add();

    function getPayGradeParameters(category) {
        let list = '';
        let options = [];

        if (category === 'MIL') {
            list = 'Ranks';
            options = ranks;
        } else if (category === 'CIV') {
            list = 'GSPayGrades';
            options = gsPayGrades;
        } else {
            list = '';
            options = [
                {
                    id: 0,
                    value: 'None'
                }
            ];
        }

        console.log(list, options);

        return {
            list,
            options
        }
    }

    const payGradeField = Component_DropDownField({
        list: '',
        label: 'Pay Grade',
        description: 'Options vary by selected Category',
        required: true,
        dropDownOptions: [],
        disabled: true,
        width: '75px',
        fieldMargin: '0px 20px 20px 0px',
        parent: categoryContainer,
        onSetValue(data) {
            const {
                newValue
            } = data;

            if (newValue.value) {
                categoryMessage.remove();

                const index = messages.indexOf(categoryMessage);

                if (index !== -1) {
                    messages.splice(index, 1)
                }
            }
        }
    });

    payGradeField.add();

    /*********************************** */

    /** Role */
    const roleField = Component_DropDownField({
        list: 'Roles',
        label: 'Role',
        required: true,
        dropDownOptions: roles,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    roleField.add();

    /** Focus on name field */
    nameField.focus();

    return {
        getFieldValues() {
            const data = {
                FirstName: firstNameField.value(),
                MiddleName: middleNameField.value(),
                LastName: lastNameField.value(),
                Account: accountField.value(),
                Email: emailField.value(),
                Command: commandField.value(),
                Group: teamTield.value(),
                Role: roleField.value()
            }

            if (!data.FirstName) {
                /** @todo field.addError() */

                return false;
            }

            if (!data.LastName) {
                /** @todo field.addError() */

                return false;
            }

            if (!data.Account) {
                /** @todo field.addError() */

                return false;
            }

            if (!data.Email) {
                /** @todo field.addError() */

                return false;
            }

            if (!data.Command) {
                /** @todo field.addError() */

                return false;
            }

            if (!data.Group) {
                /** @todo field.addError() */

                return false;
            }

            if (!data.Role) {
                /** @todo field.addError() */

                return false;
            }

            return data;
        }
    };
}
