import React, { useState } from "react";

import ApiService from "../../api/index";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiService.forgotPassword(email);
      console.log(response, "response1");
      if (response) {
        alert(`Vui long kiem tra email ${email} cua ban`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Email của bạn :</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Gửi yêu cầu</button>
    </form>
  );
}

export default ForgotPassword;
