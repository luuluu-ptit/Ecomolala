import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ApiService from "../../api/index";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //   console.log(resetToken, "token");
      const response = await ApiService.resetPassword(resetToken, password);
      console.log(response, "response:::token");
      if (response) {
        alert("Mật khẩu đã được cập nhật, Vui lòng Đăng nhập lại ...");
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mật khẩu mới : </h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Thay đổi mật khẩu</button>
    </form>
  );
}

export default ResetPassword;
