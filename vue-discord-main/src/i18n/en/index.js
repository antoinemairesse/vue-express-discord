export default {
    en: {
        server: {
            add: 'Add a server',
            create: 'Create server',
            create_error: 'Error while creating server',
            explore: 'Explore public servers',
            edit: 'Edit server|Edit server {name}',
            edit_success: 'Server updated',
            edit_error: 'Error during server update',
            delete: 'Delete server|Delete server {name}',
            delete_confirm: 'Are you sure you want to delete this server?|Are you sure you want to delete server {name}?',
            delete_success: 'Server deleted',
            delete_error: 'Error during server deletion',
            name_confirm_error: 'You didn\'t enter the server name correctly',
            context_menu: {
                invite: 'Invite people',
                edit: 'Edit server',
                delete: 'Delete server',
            },
            invite_error: 'Error during invite link creation',
            kick: 'Kick {username} from Server',
            kick_confirm: 'Are you sure you want to kick {username} from the server? They will be able to rejoin again with a new invite.',
            kick_error: 'Error while kicking user',
            ban: 'Ban {username} from Server',
            ban_confirm: 'Are you sure you want to ban {username} from the server?',
            ban_error: 'Error while banning user',
            leave: 'Leave server|Leave server {name}',
            leave_confirm: 'Are you sure you want to leave this server?|Are you sure you want to leave server {name}?',
            leave_error: 'Error while leaving server',
        },
        channel: {
            add: 'Add channel',
            create_error: 'Error while creating channel',
            edit: 'Edit channel|Edit channel {name}',
            edit_success: 'Channel updated',
            edit_error: 'Error during channel update',
            delete: 'Delete channel|Delete channel {name}',
            delete_confirm: 'Are you sure you want to delete this channel?|Are you sure you want to delete channel {name}?',
            delete_success: 'Channel deleted',
            delete_error: 'Error during channel deletion',
            type: {
                text: 'Text channels'
            },
            none: 'No text channels',
            none_text: 'You find yourself in a strange place. You don\'t have access to any text channels, or there are none in this server.',
        },
        message: {
            send: 'Send a message in {channel}',
            modified: 'modified',
            delete: 'Delete message',
            delete_confirm: 'Are you sure you want to delete this message?',
            delete_success: 'Message deleted',
            delete_error: 'Error during message deletion',
            edit_escape: 'escape to',
            edit_enter: 'enter to',
        },
        members: {
            context_menu: {
                ban_user: 'Ban user',
                kick_user: 'Kick user',
            },
        },
        status: {
            online: 'Online - {count}',
            offline: 'Offline - {count}',
        },
        channel_type: {
            text: {
                name: 'Text',
                description: 'Send messages, images, GIFs, emoji, opinions, and puns',
            }
        },
        form: {
            labels: {
                channel_name: 'Channel name',
                server_name: 'Server name',
                enter_server_name: 'Enter server name',
            },
            buttons: {
                create_channel: 'Create channel',
            },
        },
        validation: {
            required: '{field} is a required field',
            email: 'Email must be a valid email',
            min: '{field} must be at least {count} characters long',
            max: '{field} must be at most {count} characters long',
        },
        settings: {
            update: 'Update profile',
            edit_success: 'Profile updated',
            edit_error: 'Error while updating profile',
        },
        chat: {
            and: 'and',
            are_typing: 'are typing',
            is_typing: 'is typing',
            more_typing: 'more are typing',
        },
        invite: {
            send: 'Send a server invite link to a friend',
            expires_in: 'Your invite link expires in {expiration}.',
            never_expires: 'Your invite link will never expire.',
            edit: 'Edit invite link',
            expire_after: 'Expires after',
            new_link: 'Generate a New Link'
        },
        login: {
            need_account: 'Need an account?',
            forgot_password: 'Forgot your password?',
            welcome_back: 'Welcome back!',
            error: 'Invalid login or password',
            see_you_again: 'We\'re so excited to see you again!'
        },
        username: 'Username',
        cancel: 'Cancel',
        save: 'Save',
        kick: 'Kick',
        ban: 'Ban',
        en: 'English',
        fr: 'French',
        lang: 'Lang',
        signin: 'Log In',
        logout: 'Logout',
        register: 'Register',
        copy: 'Copy',
        copied: 'Copied',
        private_messages: 'Private messages',
        email: 'Email',
        password: 'Password',
        forbidden: 'You don\'t have permission to do this'
    },
};
