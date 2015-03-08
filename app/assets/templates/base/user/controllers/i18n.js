
App.get("i18n").reopen({
    fr : {
            leftmenu: {
                    project_list: "Liste de Projets"
            },
            first_name: "Prenom",
            last_name: "Nom de famille",
            project: {
                    admin_must_enable: "Pour utiliser ce project, vous devez selectionner un services de cloud et lui configurer un set de clef API."
            }
    },
    en : {
            invalid_password: "Password is invalid.",
            leftmenu: {
                project_list: "Project List"
            },
            warning_alert_prefix: "Warning !",
            error_invalid_fields_values: "Various fields contains invalid values.",
            must_select_value: "You must select a value",
            numeric_non_decimal_greater_or_equal_zero: "Must be an integer greater or equal to 0",
            numeric_required: "Must be an integer value",
            cancel_button_text: "Cancel",
            save_button_text: "Save",
            quotas_tags_limit: "Set Quota tags to limit this Cloud API Usage.",
            add_more_tag: "Add another Tag",
            remove_tag: "Remove current Tag",
            twochar_required_and_no_space_input: "Must not contain space, and be at least 2 characters",
            empty_valid_but_no_space_input: "Must not contain space",
            error_alert_prefix: "Error !",
            success_saving_model_to_backend: "The operation have ben completed successfully.",
            error_saving_model_to_backend: "A server error occured while performing the update, our talented monkeys are working on it!",
            error_deleting_model_to_backend: "A server error occured while performing the deletion of object, do you mind refreshing your browser?",
            apisecretkey: "API Secret Key",
            roles: "Role",
            quota : {
                tag: "Tag",
                tag_tooltip: "Tag that will be configured on other Users and API Keys",
                user_tags_limit: "Enter a set of tags to set the user limits",
                quota_limit_text: "The minimal value of all tags will be the selected value for the User or a specific API Key.",
                tag_input_placeholder: "Enter short tag here.",
                compute: "Maximum Servers",
                compute_tooltip: "Number of virutal servers the user can create"
            },
            project : {
                displaytag_input_placeholder: "Tag used to do mapping for user access",
                create_key_tooltip: "How should we display the key name?",
                create_server: "Create a new server",
                add_more_roles: "Add more roles",
                remove_roles: "Remove selected role",
                user_roles: "Assign roles to a user",
                create_group_tooltip: "Create new Group",
                send_invite: "Send Invite",
                invite_user_tooltip: "Invite a team member",
                invite_email_placeholder: "Enter an email address",
                invite_email: "Email",
                invite_email_tooltip: "Enter an Email address to invite to this project",
                email_invite_text: "After invite, you must assign Tags to this user",
                invite_email_placeholder: "Enter an email address",
                create_quota_tooltip: "Create a Quota",
                create_tooltip: "Create a new Project",
                create_first_tooltip: "Create your first Project",
                displayname_input_placeholder: "Enter a descriptive name here",
                admin_must_enable: "In order to enable this project, you must either add a Managed Subscription, or add an API / Key using the Cloud Providers section.",
                create_name_tooltip: "This name will be shown for creation of new servers.",
                create_tag_tooltip: "This tag is used to do mapping with user / groups.",
                admin_project_must_configure: "Your administrator must configure the API Key on this Project.",
                provider_select: 'Select a provider from the list.',
                publickey_input_placeholder: 'Enter the cloud api key',
                privatekey_input_placeholder: 'Enter the cloud secret key'
            },
            digitalocean : {
                clientid: "Cient ID",
                clientid_tooltip: "Client Id retreived from the cloud provider"
            }
    }
});