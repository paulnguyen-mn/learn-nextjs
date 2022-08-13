---
slug: lo-trinh-hoc-reactjs-co-ban-2020
title: Lộ trình học ReactJS cơ bản cho người mới bắt đầu 2020 🥰
author: Hậu Nguyễn
author_title: Senior Software Engineer at fram^
author_url: https://github.com/paulnguyen-mn
author_image_url: https://avatars3.githubusercontent.com/u/31444102?s=400&u=c545a527aa31843e1361462e410c0f51863e8e26&v=4
image: https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80
tags: [reactjs, lộ trình học reactjs cơ bản]
date: '2022-06-18T11:00:00Z'
---

Rất nhiều bạn thắc mắc không biết là học ReactJS là học những gì? Rồi bắt đầu từ đâu? Sử dụng những package, thư viện nào, ... Để giúp các bạn trả lời câu hỏi đó, mình có tổng hợp lại một số nguồn tham khảo cũng như kinh nghiệm cá nhân của mình để viết ra lộ trình học ReactJS này, hi vọng giúp ích được cho các bạn. 😉

<!-- truncate-->

- **Đôi tượng**: mới bắt đầu học ReactJS mà không biết học những gì.
- **Yêu cầu kiến thức**: 
  - Javascript cơ bản: [https://javascript.info/](https://javascript.info/)
  - ES6 syntax: [http://es6-features.org/#Constants](http://es6-features.org/#Constants)
  - Git cơ bản: Học cách quản lý source code
  - NPM (Node Package Manager): Tìm hiểu xem đây là gì?
  - Tiếng Anh (vì tài liệu đa số là Tiếng Anh)

Nếu như mọi người chưa biết Javascript là gì, thì mình khuyên các bạn nên học JS trước rồi hẵn sang ReactJS nhé, kẻo ngợp nè! 😉

## Mảng kiến thức cơ bản (BẮT BUỘC)

**MỘT VÀI NOTES:**

- ReactJS là `thư viện` để xây dựng UI component, chứ không phải `framework` nha. 
- `Lib (thư viện)` vs `framework` khác nhau cái gì? Các bạn chịu khó google để biết thêm nha.
- Version hiện tại của ReactJS là bao nhiêu? 
- ReactJS là của ai hay tổ chức nào?
- Tại sao phải cần ReactJS, sao không viết thuần javascript? 
- Sẽ hơi khó hiểu khi mới đầu tiếp cận ReactJS, nhưng không sao, cứ đi tiếp nha hehee

### 0. Setup môi trường làm việc

**Bạn cần gì để bắt đầu code được ReactJS:**

- Cài đặt [NodeJS](https://nodejs.org/en/) (runtime của javascript)
- Code editor: dùng [VSCode](https://code.visualstudio.com/)
- Cài đặt một vài extension hữu ích của VSCode: (OPTIONAL)
  - Live Server
  - Material Theme Icons
  - Material Theme
  - Sử dụng Fira Code font
  - ReactJS code snippets
  - ESLint
  - Babel Javascript
  - Bracket Pair Colorizer:
- Bắt đầu tạo project:
  - Dùng tool `Create React App` để tạo một ReactJS project mẫu: [https://create-react-app.dev/docs/getting-started/](https://create-react-app.dev/docs/getting-started/)

Tada xong tới đây là bạn phải chạy lên được cái website đơn giản của ReactJS rồi đó. <br/>
Giờ học code ReactJS thôi hehe 😎

### 1. Kiến thức nền tảng

- Đi hết phần Main Concepts của ReactJS, bắt đầu ở đây: [https://reactjs.org/docs/hello-world.html](https://reactjs.org/docs/hello-world.html)

> **Lưu ý**: 
> - Không vội vàng, đừng đi nhanh mà không hiểu gì hết.
> - Đi từng mục một, đi chậm, học tới đâu, lấy code bỏ vào VSCode chạy lên thử coi nó ra như thế nào để hiêu nó.
> - Nếu gặp khó khăn, không hiểu topic nào thì tìm thêm blog, videos về chủ đề đó mà coi thêm.

- Sau khi đi hết phần kiến thức này, hãy tự làm một website đơn giản mà bạn thích: 
  - `Todo App`: Thêm, Xoá, Sửa và hiển thị ra danh sách TODOS
  - `Simple Cart`: Hiển thị danh sách sản phẩm, thêm vào giỏ hàng và tính tiền.
  - ... 

> Mục đích cho phần này để đảm bảo các bạn hiểu và vận dụng được kiến thức của ReactJS.

- Thêm vào đó, các bạn có thể tham khảo thêm các videos mình làm cho ReactJS cơ bản để nắm rõ hơn một số chủ đề mình trao đổi: [https://www.youtube.com/playlist?list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq](https://www.youtube.com/playlist?list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq)

### 2. Type checking

- Đây là một nội dung OPTIONAL. Không có Type Checking, code của bạn vẫn chạy được bình thường.
- Thỉnh thoảng bạn thấy code như vầy: 

```js 
import PropTypes from 'prop-types';

function Item() {
  // ...
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  isSpecial: PropTypes.bool,
}

export default Item;
```

- Để ý cái phần `Item.propTypes`, khúc này dù có hay không thì code của bạn vẫn chạy.

**Vậy Type Checking có tác dụng gì mà mình phải consider thêm nó vào?**

- `Cảnh báo lỗi nếu truyền sai kiểu dữ liệu` khi đang dev. Thỉnh thoảng mình hay quên, không để ý loại dữ liệu truyền vào component, dẫn tới một số trường hợp tính toán sai và không như mong muốn, với `Type Checking` nó sẽ giúp mình báo lỗi để mình biết và fix sớm.
- Type Checking nó chỉ hoạt động khi dev, còn khi lên production nó không chạy nên không sợ bị ảnh hưởng tới performance.
- Khi component của bạn dần lớn, sử dụng nhiều props, việc khai báo tập trung này giúp bạn có thể biết được, à component này đang sử dụng props gì. Nếu không có, bạn phải scan hết code của component mới biết nó đang dùng những props nào 😭


> Link tham khảo: https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes


### 3. Form

Trong dự án thực tế, ít ai mà tự xử lý các vấn đề liên quan tới form, thay vào đó là sử dụng một thư viện có sẵn. Ở đây mình có một vài ứng cử viên: 

- `React Hook Form` (recommended): mới nhất.
- `Formik`: phổ biến nhất.
- `Redux Form`: cái này lưu ý bạn phải dùng redux à nhen 😉

Bạn có thể chọn 1 trong 3 để học và áp dụng vào dự án của mình. Nhưng recommend là học `React Hook Form` hoặc `Formik` thôi.

Khi làm việc với Form, bạn sẽ cần tới một schema validator để hỗ trợ bạn validate dữ liệu trong Form, 2 ứng cử viên cho vị trí này: 

- [Joi](https://hapi.dev/module/joi/api/)
- [Yup](https://github.com/jquense/yup): được inspired từ Joi

**Làm việc với Form, cần lưu ý điều gì?**

- Làm sao set được giá trị khởi tạo cho form.
- Tổ chức Form như thế nào, bạn nên phân biệt rõ 3 levels 
  - Thứ nhất là `Form`: Thư viện quản lý Form như `Formik` hay `react-hook-form`
  - Thứ hai là `Form Field`: cầu nối để bind giá trị của `form` vào `ui control`.
  - Thứ ba là `UI Control`: cái này là những control của thư viện Bootstrap, Material Design hay AntDesign.
  - Để hiểu rõ hơn, cùng mình tìm hiểu qua video này nhé: [https://youtu.be/LuNYJuyQxKE](https://youtu.be/LuNYJuyQxKE)

### 4. Routing

- Cái này thì bạn sẽ dùng package `react-router-dom` nè hehe 
- Tài liệu tham khảo đây: [https://reacttraining.com/react-router/web/guides/quick-start](https://reacttraining.com/react-router/web/guides/quick-start)
- Setup routing trong project đơn giản: [https://youtu.be/mAhUJdf0Kug](https://youtu.be/mAhUJdf0Kug)

Một số điều bạn cần lưu ý khi làm việc với routing:

- Setup routing trong một project gồm những bước nào?
- Tìm hiểu về Router, Switch, Route và Redirect.
- Setup nested routing như thế nào? Đây chính là cách tạo ra layout chung ở component cha, và tuỳ vào routing con sẽ render component con tương ứng.


### 5. API

- API là cách thức để client và server có thể giao tiếp với nhau.
- Mình có một vài lựa chọn để thực hiện gọi một API: 
  - [XHR](https://javascript.info/xmlhttprequest): cái này hơi cũ cũ òi, viết dạng callback.
  - [Fetch](https://javascript.info/fetch): cái này có sẵn trong trình duyệt, viết dạng Promise.
  - [Axios](https://github.com/axios/axios) (recommended): cái này nên dùng trong project thực tế nè.

**Tổ chức API module trong project thực tế như thế nào?**

- Thường các file api sẽ được đặt trong 1 folder tên là `api`
- Lựa chọn 1 http client: thường là `axios`, còn trường hợp project nhỏ, đơn giản thì có thể dùng `fetch` cũng được. Fetch tiện cái là `ko cần cài thêm thư viện`. Còn axios thì phải cài thêm package `axios` nhen.

```
api
|__ axiosClient.js hoặc fetchClient.js: config http client và cung cấp các phương thức get, post, put, ...
|__ productApi.js
|__ categoryApi.js
|__ userApi.js
|__ ... cứ mỗi một resource sẽ có một file API tương ứng 😉
```

- Sắp tới sẽ có video giải thích về API module này. Mình bổ sung link sau hen hihi 

### 6. Hooks

- Ông thần này ra đời giúp Functional component mạnh lên hẵn, thẩm chí vượt mặt cả Class component.
- Mình có làm 1 series về hooks, đơn giản, dễ hiểu và khá là chi tiết, bạn có thể tham khảo ở đây hen [https://www.youtube.com/playlist?list=PLeS7aZkL6GOsHNoyeEpeL8B1PnbKoQD9m](https://www.youtube.com/playlist?list=PLeS7aZkL6GOsHNoyeEpeL8B1PnbKoQD9m)


### 7. State management

Lưu ý khi có state cần đặt câu hỏi: 
- Nếu state này chỉ dùng cho 1 component hiện tại --> dùng component state. 
- Nếu state này nó share cho nhiều components khác nhau --> cần thư viện quản lý state.

Hiện tại thì [Redux](https://redux.js.org/introduction/getting-started) chiếm lợi thế trên thị trường òi khi nhắc tới state management.
- Giờ có [Redux Toolkit](https://redux-toolkit.js.org/) giúp mình sử dụng Redux đơn giản hơn, code ít hơn và được handle bên dưới nhiều hơn.
- Khuyến khích các bạn nên học Redux cơ bản trước, rồi hãy tới Redux Toolkit nhé.

Nhưng gần đây, Facebook có đang thử nghiệm một thư viện để quản lý state cho ReactJS, đó là [Recoil](https://recoiljs.org/).
- Lưu ý vẫn còn đang thử nghiệm, nên hãy khoan apply cho production.
- Mình có làm 1 vài videos về Recoil, nếu quan tâm bạn có thể tham khảo hen.


## Một vài topic nâng cao 

### 1. HOC

- Tham khảo [https://reactjs.org/docs/higher-order-components.html](https://reactjs.org/docs/higher-order-components.html)


### 2. Authentication

Cái này là phần đăng nhập, đăng ký rồi quên mật khẩu các kiểu, ... Thường project nào cũng có và được làm sẵn, ít người có cơ hội được làm phần này vì nó khá phức tạp và mỗi project setup 1 lần là xong, ít khi phải đụng lại lần 2 🙂

Để làm cái này, mình có thể dùng mấy ông lớn để giúp mình như

- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Auth0](https://auth0.com/)

Các bạn chịu khó đọc docs để hiểu nó là gì nha.

- Cần hiểu được 1 cái flow đăng nhập, đăng ký diễn ra như thế nào.
- Token là gì? Tại sao lại cần quản lý nó ? Không có token có được không?
- Nhập username, password lên server có bị lộ thông tin giữa đường không? 
- Nên lưu token trên website ở đâu?
- Lỡ token mà bị expired thì phải xử lý thế nào? 
- ...

### 3. I18n

- Các bạn search Google xem i18n là viết tắt của cái gì nha.
- Cái này được dùng cho việc hỗ trợ đa ngôn ngữ, khi click vào ngôn ngữ tương ứng thì website được đổi ngôn ngữ tức thì.
- Package được sử dụng là [React i18 next](https://react.i18next.com/) 
- Ông thần này sử dụng được cho cả Class component và Function component (có hooks)
- Có phải project nào cũng hỗ trợ đa ngôn ngữ không? Cũng tuỳ project, nên xác định ngay từ đầu, nếu có làm đa ngôn ngữ thì setup từ đầu luôn cho đỡ khổ. 

### 4. Static sites

- [React Static](https://github.com/react-static/react-static)
- [Gatsby](https://www.gatsbyjs.org/)
- [NextJS](https://nextjs.org/)

### 5. Deployment

Làm thế nào để deploy website lên server để share cho người khác xem thành quả cày cuốc của mình.

- Deploy siêu đơn giản giống mình trong video này: 
- Tham khảo full options tại đây: [https://create-react-app.dev/docs/deployment/](https://create-react-app.dev/docs/deployment/)


## Nguồn tài liệu tham khảo

Rất nhiều link tham khảo về các thư viện làm việc về ReactJS được tổng hợp ở đây: [https://github.com/enaqx/awesome-react](https://github.com/enaqx/awesome-react). Có gì mọi người tham khảo thêm hen. 😉 

> CẢNH BÁO: Lạc lối do nhiều links tham khảo quá 🤣

Những thông tin mình ghi nhận trong bài này là từ kinh nghiệm cá nhân, nên sẽ có phần thiếu sót, mọi người hãy cùng bổ sung, đóng góp cho nó hoàn chỉnh nhé. <br/>
Cảm ơn mọi người rất nhiều nè ❤️

