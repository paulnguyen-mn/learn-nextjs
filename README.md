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

## `06-12` Text content did not match. Server: "Blog" Client: "Works"

Process:
1. Server side generate HTML (A) and send to client
2. Client get HTML (A) to display on UI and download JS in the background
3. Once JS downloaded, it will be executed. Hydration process take place and generate a new DOM (B). Then it try to match B and A and attach event listener to it.

If A = B --> OK
If A <> B --> Show error text content did not match

Solutions:
- Make sure the first render on client side should be the same with server side.
- Use client side rendering via dynamic feature of NextJS (not SEO friendly)


Refs:
- [https://nextjs.org/docs/messages/react-hydration-error](https://nextjs.org/docs/messages/react-hydration-error)
- [https://www.joshwcomeau.com/react/the-perils-of-rehydration/](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)
- [https://blog.saeloun.com/2021/12/16/hydration](https://blog.saeloun.com/2021/12/16/hydration)
- [https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao](https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao)
- [https://nextjs.org/docs/advanced-features/dynamic-import](https://nextjs.org/docs/advanced-features/dynamic-import)