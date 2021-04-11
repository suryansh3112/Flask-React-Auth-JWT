import React, { useContext, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import Error from '../Errors/Errors';
import UserContext from '../../context/UserContext';
import './login.css';


function Login() {
  const {setUserData} = useContext(UserContext);
  const [error, setError] = useState('');
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const loginRes = await axios.post('/login',values);

      const {user, access_token} = loginRes.data;

      setUserData({
        auth:true,
        user:user
      })
      
      localStorage.setItem('auth-token', access_token);

      history.push('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const clearError = () => setError(undefined);

  return (
    <div className="login-container">
      <h1>Login</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        {error && <Error message={error} clearError={clearError} />}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
        
          <Link className="login-form-forgot" to="/">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
      
    </div>
  );
 
}

export default Login;
