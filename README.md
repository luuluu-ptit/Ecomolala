VTCPay 2023

- Build a COMPLETE Fullstack Responsive MERN App SOCIAL NETWORK| React, MongoDB, MUI, NodeJS, and Express

- Our Team :

  - Phạm Việt Hoàng,
  - Phùng Tấn Đăng Khoa,
  - Phạm Trường Anh,
  - Lưu Nhân Công
  - Nguyễn Văn Hiếu,
  - Nguyễn Viết Huy,
  - Nguyễn Phú Toản

- Detail project report :

  - Link postman : https://app.getpostman.com/join-team?invite_code=1f5e27c19afda1939f3734e46bfbedb6&target_code=8761e71f9f5769219cc7ef901e3bc539

  - Link drive, docs and diagram : https://drive.google.com/drive/folders/1XE3ptsdTh0jDfGNnlLTUivo6YX95n0Me?usp=sharing

- Config :

  - Installation for server : ...
  - Installation for client : ...
  - concurrently : npm install --save-dev concurrently
  - curl http://localhost:3000
  - Middleware :
    - // app.use(morgan("compile")); -> when run product ; "dev" : when run dev .
    - // app.use(morgan("common"));
    - // app.use(morgan("short"));
    - // app.use(morgan("tiny"));
  - morgan :
  - helmet : ngawn chan cac ben thu 3 truy cap vao cookie.
  - compression : Khi van chuyen du lieu (payload) qua nhieu -> ton bang thong (cua nguoi dung, cua nha phat trien)
  - Với --save-dev -> add vào chỗ dev-dependences và ngược lại sẽ add vào dependencies :
    - Dev-dependences thì sẽ là những thư viện ở trên môi trường dev ( ở đây là development)
    - dependences là những thư viện để app chạy được trên production
      Nếu bạn chạy npm install trên production thì nó sẽ install cả
    - dev-dependences , dependences
      Nhưng trong lúc build run npm install --production thì nó sẽ chỉ install ở dependences, và nếu trong file app.js có require('helmet') (thư viện ở trong dev-dependencies) thì nó sẽ bị lỗi.
  - util : viet ve nhung function
  - helper : uy quyen, giup chung ta nhieu hon...
  - node --watch server
  - snippet data model : !dmbg

- //Sign up - Sign in - Sign out
  - Sign up :
  - Tao 1 cap token -> Publickey, -> publickeyString: luu vao model keyTokenModel

- tại sao phải độc lập inventory và product : sử dụng cho mục đích khác nhau (product : số sản phẩm có sẵn để bán; inventory : lưu thông tin mức độ tồn kho)


@write by : CongLuu
