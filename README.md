# Learn NextJS - Notes

## `06-09` Show hide menu based on login status

1. Config route list to specify which menu requires login
2. Render route list based on login status
3. Integrate with login and test

## `06-10` add type definition for useAuth

- Target to have type suggestion when using profile from useAuth()
- TIP: Organize Imports (Option + Shift + O)

## `06-11` save logged in user info

**Current flow:**
1. On init: useAuth with default data = `undefined`
2. Call API profile and update data = logged in user

**Updated flow:**
1. Save user's info to local storage if login successfully
2. On init: useAuth with default data = `user info from local storage`
3. Call API profile and update data = logged in user
4. Remove local storage if logout

key: `user_info`

Unexpected cases handling:
- What if fetch profile failed?