import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Divider } from "@mui/material";

const LoginRegister = ({ setCurrentUser }) => {
  // State cho login
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  // State cho register
  const [registerData, setRegisterData] = useState({
    login_name: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // State điều khiển hiển thị form
  const [showRegister, setShowRegister] = useState(false);

  // Xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login_name: loginName, password: loginPassword }),
      });
      if (!response.ok) {
        const data = await response.json();
        setLoginError(data.error || "Login failed");
        return;
      }
      const user = await response.json();
      setCurrentUser(user);
    } catch (err) {
      setLoginError("Network error");
    }
  };

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Mật khẩu nhập lại không khớp.");
      return;
    }
    if (
      !registerData.login_name || !registerData.first_name || !registerData.last_name || !registerData.password
    ) {
      setRegisterError("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_name: registerData.login_name,
          password: registerData.password,
          first_name: registerData.first_name,
          last_name: registerData.last_name,
          location: registerData.location,
          description: registerData.description,
          occupation: registerData.occupation,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setRegisterError(data.error || "Đăng ký thất bại");
        return;
      }
      setRegisterSuccess("Đăng ký thành công! Bạn có thể đăng nhập.");
      setRegisterData({
        login_name: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
      });
    } catch (err) {
      setRegisterError("Network error");
    }
  };

  return (
    <Paper style={{ padding: 24, maxWidth: 400, margin: "40px auto" }}>
      {!showRegister ? (
        <>
          <Typography variant="h5" gutterBottom>
            Please Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Login Name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {loginError && (
              <Typography color="error" variant="body2">
                {loginError}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          <Divider style={{ margin: "24px 0" }} />
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => setShowRegister(true)}
          >
            Đăng ký tài khoản mới
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Login Name"
              value={registerData.login_name}
              onChange={(e) => setRegisterData({ ...registerData, login_name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Nhập lại Password"
              type="password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="First Name"
              value={registerData.first_name}
              onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Last Name"
              value={registerData.last_name}
              onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Location"
              value={registerData.location}
              onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={registerData.description}
              onChange={(e) => setRegisterData({ ...registerData, description: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Occupation"
              value={registerData.occupation}
              onChange={(e) => setRegisterData({ ...registerData, occupation: e.target.value })}
              fullWidth
              margin="normal"
            />
            {registerError && (
              <Typography color="error" variant="body2">
                {registerError}
              </Typography>
            )}
            {registerSuccess && (
              <Typography color="primary" variant="body2">
                {registerSuccess}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="secondary" fullWidth style={{ marginTop: 16 }}>
              Register Me
            </Button>
          </form>
          <Divider style={{ margin: "24px 0" }} />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setShowRegister(false)}
          >
            Quay lại đăng nhập
          </Button>
        </>
      )}
    </Paper>
  );
};

export default LoginRegister;