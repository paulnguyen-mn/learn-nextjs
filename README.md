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


## `06-13` fix issues from video of 06-10 + 06-12

- Can't change tsconfig from `jsx: preserve` to `jsx: react`
- Can safely remove React import due to [this post](https://nextjs.org/docs/upgrading#react-16-to-17)
- Can't use named export with ssr: false --> change to use default import instead


Refs:
- [https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

## `06-14` show login error

- Mock response to return Error instead of success
- How to extract error body from API response
  - Throw error response in axios interceptor
  - Retrieve error message in catch statement
  - Do whatever you want with the message (show toast, log, report error, ...)
  - add react-toastify package
  - toast error message

Ref: [https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)