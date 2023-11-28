- Build a COMPLETE Fullstack Responsive MERN App ECOMMERCE|
- Stack using : FRONTEND( React, AntDesign ) && BACKEND (NodeJS, ExpressJS) && DATABASE (MongoDB, Redis)

- Detail project report :

  - Link postman : https://app.getpostman.com/join-team?
    invite_code=1f5e27c19afda1939f3734e46bfbedb6&target_code=8761e71f9f5769219cc7ef901e3bc539

  - Link drive, docs and diagram : https://drive.google.com/drive/folders/1XE3ptsdTh0jDfGNnlLTUivo6YX95n0Me?usp=sharing

  * Chức năng đăng ký và đăng nhập: cho phép khách hàng đăng ký tài khoản để mua hàng và theo dõi đơn hàng, đồng thời cung cấp cho khách hàng một phương thức đăng nhập an toàn để bảo vệ thông tin cá nhân.

  * Chức năng quản lý tài khoản: cho phép khách hàng quản lý thông tin tài khoản của mình như địa chỉ, thông tin thanh toán, đổi mật khẩu, v.v.

  * Chức năng giỏ hàng: cho phép khách hàng thêm sản phẩm vào giỏ hàng và có thể thay đổi số lượng sản phẩm hoặc xóa sản phẩm ra khỏi giỏ hàng trước khi hoàn thành việc đặt hàng.

  * Quản lý sản phẩm: cho phép người quản trị cập nhật và quản lý thông tin sản phẩm như tên sản phẩm, mô tả, giá cả, số lượng còn lại, ảnh sản phẩm, thương hiệu, danh mục sản phẩm, v.v.

  * Tính năng tìm kiếm: cho phép khách hàng tìm kiếm sản phẩm dễ dàng bằng cách nhập từ khóa tìm kiếm và tìm kiếm theo danh mục sản phẩm, thương hiệu, giá cả, v.v.

  * Quản lý đơn hàng: cho phép khách hàng đặt hàng và thanh toán trực tuyến, đồng thời cung cấp cho người quản trị thông tin chi tiết về đơn hàng như tên khách hàng, địa chỉ, sản phẩm đặt hàng, số lượng, giá cả, phí vận chuyển, v.v.

  * Khuyến mãi: cho phép người quản trị quản lý các chương trình khuyến mãi, mã giảm giá, coupon để khách hàng có thể sử dụng để giảm giá hoặc nhận các ưu đãi khác khi mua hàng.

  * Quản lý kho hàng: cho phép người quản trị theo dõi số lượng hàng tồn kho, lịch sử nhập xuất kho, đồng thời cung cấp thông tin chi tiết về mỗi sản phẩm như số lượng còn lại, số lượng đã bán, v.v.

  * Chức năng đánh giá và nhận xét: cho phép khách hàng đánh giá và viết nhận xét về sản phẩm mình đã mua, giúp người dùng khác có thể đưa ra quyết định mua hàng tốt hơn.

  * Quản lý khách hàng: cho phép người quản trị quản lý thông tin khách hàng như tên, địa chỉ, email, số điện thoại, lịch sử mua hàng, v.v.

  ================================================================

  - Quản lý bán hàng: cho phép người quản trị theo dõi doanh số bán hàng, lợi nhuận, chi phí vận hành và quản lý các hoạt động khác liên quan đến bán hàng.

  - Quản lý vận chuyển: cho phép người quản trị quản lý các thông tin về vận chuyển như đối tác vận chuyển, phí vận chuyển, thời gian giao hàng, v.v.

  - Chức năng thanh toán trực tuyến: cho phép khách hàng thanh toán trực tuyến bằng các phương thức thanh toán phổ biến như thẻ tín dụng, ví điện tử, chuyển khoản ngân hàng, v.v.

  - Chức năng xử lý đơn hàng: cho phép hệ thống xử lý đơn hàng và thông báo cho khách hàng về tình trạng đơn hàng, thời gian giao hàng, v.v.

- API (Done 41) :

  <h5>USER/SHOP-ACCESS<h5>
  - Login [PUBLIC] <br>
  - Sign up [PUBLIC]<br>
  - Forgot Password (with gmail) [PUBLIC]<br>
  - Reset Password [PUBLIC]<br>
  - Authentication(middleware,permission) [PUBLIC]<br>
  - Convert role user to seller [USER]<br>
  - Cancellation Of Sales [SHOP]<br>
  - Change Password [PUBLIC]<br>
  - Handler RefreshToken [USER,SHOP]<br>
  - Logout  [USER,SHOP]<br>
  <!-- - Tokens [USER,SHOP]<br> -->
  - Add Liked Product [USER,SHOP]<br>
  - Get Liked Products [USER,SHOP]<br>
  - Update information access of user [USER,SHOP]<br>
  <h5>PRODUCT<h5>
  - Get List Search Product [PUBLIC]<br>
  - Find All Products [PUBLIC]<br>
  - Find Product [PUBLIC]<br>
  - Create Product [SHOP]<br>
  - Update Product [SHOP]<br>
  - Publish Product By Shop [SHOP]<br>
  - Unpublish Product By Shop [SHOP]<br>
  - Get All Drafts For Shop [SHOP]<br>
  - Get All publish for Shop [SHOP]<br>
  <h5>CART<h5>
  - Add Product To Cart [USER,SHOP]<br>
  - Update Product Quantity [USER,SHOP]<br>
  - Delete Item Cart [USER,SHOP]<br>
  - Get List Cart [USER,SHOP]<br>
  <h5>DISCOUNT<h5>
  - Get Discount Amount [USER]<br>
  - Get All Discount With Product [USER]<br>
  - Cancel Discount [USER]<br>
  - Create Discount [SHOP]<br>
  - Update Discount Service [SHOP]<br>
  - Get All Discount By Shop [SHOP]<br>
  - Delete Discount [SHOP]<br>
  <h5>CHECKOUT/ORDER<h5>
  - checkout review [USER]<br>
  <h5>UPLOAD FILE<h5>
  - upload from url<br>
  - upload single file from local<br>
  - upload multi file from local<br>
  <h5>ORDER<h5>
  - checkout/ review order<br>
  - order by usrt<br>
  <h5>ORDER<h5>
  - add stock to inventory<br>

- FrontEnd :

  - Login, sign up and log out <br>

- Curently being researched and developed :

  - FrontEnd

- Start development:

  - npm run build

- Config :
  - concurrently : npm install --save-dev concurrently
  - curl http://localhost:3000

@write by : CongLuu
