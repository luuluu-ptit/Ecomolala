import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./profile.scss";
import { useDispatch } from "react-redux";
import {
  Card,
  Avatar,
  Typography,
  Descriptions,
  Button,
  Input,
  notification,
} from "antd";
import APIservice from "../../api/index";
import Auth from "../../store/actions/auth.action";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.shop.name);
  const [email, setEmail] = useState(currentUser.shop.email);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateInfo();
    // console.log("handleSubmit");
    setIsEditing(false);
  };

  const handleUpdateInfo = async () => {
    try {
      const response = await APIservice.updateInformationAccessOfUser(
        name,
        email
      );
      if (response) {
        dispatch(Auth.updateInformationAccessOfUser(name, email));
        // console.log(name, "nameXXXX");
        notification.success({
          message: "Success",
          description: "User information updated successfully.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred while updating user information.",
      });
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="user-info-page">
      <Card style={{ width: 500, marginTop: 16 }}>
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
        </Descriptions>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Input type="text" value={name} onChange={handleNameChange} />
            <Input type="email" value={email} onChange={handleEmailChange} />
            <Button type="submit" htmlType="submit">
              Submit
            </Button>
          </form>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </Card>
    </div>
  );
};

export default Profile;
