import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./profile.scss";

import { Card, Avatar, Typography, Descriptions } from "antd";

// const Profile = () => {
//   const { user: currentUser } = useSelector((state) => state.auth);
//   // console.log("Profile", Profile);

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     // <div className="container">
//     //   <header className="jumbotron">
//     //     <h3>
//     //       <strong>{currentUser.username}</strong> Profile
//     //     </h3>
//     //   </header>
//     //   <p>
//     //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
//     //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
//     //   </p>
//     //   <p>
//     //     <strong>Id:</strong> {currentUser.id}
//     //   </p>
//     //   <p>
//     //     <strong>Email:</strong> {currentUser.email}
//     //   </p>
//     //   <strong>Authorities:</strong>
//     //   <ul>
//     //     {currentUser.roles &&
//     //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
//     //   </ul>
//     // </div>
//     <div className="profile">{currentUser.shop.name}</div>
//   );
// };

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  // console.log("Profile", Profile);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="user-info-page">
      <Card style={{ width: 500, marginTop: 16 }}>
        {/* <Avatar size={64} src={currentUser.shop.AvataravatarUrl} /> */}
        <Avatar
          size={64}
          src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
        <Typography.Title level={2}>{currentUser.shop.name}</Typography.Title>
        <Typography.Text type="secondary">
          {currentUser.shop.email}
        </Typography.Text>
        <Descriptions bordered>
          <Descriptions.Item label="Username">
            {currentUser.shop.username}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            Hà Nội, Việt Nam
          </Descriptions.Item>
          {/* <Descriptions.Item label="Registered at">{currentUser.registeredAt}</Descriptions.Item> */}
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;
