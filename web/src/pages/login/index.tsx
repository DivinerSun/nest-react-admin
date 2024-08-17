import { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/auth';
import { useCommonStore } from '@/store/common';
import { ILoginParams } from '@/types/auth';
import { toast } from '@/utils/message';

import styles from './index.module.scss';
import Logo from '@/assets/favicon.svg';

const Login = () => {
  const { login } = useAuthStore();
  const { codeInfo, fetchCode } = useCommonStore();

  useEffect(() => {
    fetchCode();
  }, []);

  const checkCode = (input: string) => {
    if (codeInfo) {
      const code = atob(codeInfo.text).toLowerCase();
      const inputCode = input.toLowerCase();
      return code === inputCode;
    } else {
      return false;
    }
  };

  const handleLogin = (values: ILoginParams) => {
    const { email, password, code } = values;
    if (!checkCode(code)) {
      toast('验证码错误', 'error');
      return;
    }
    login({
      email,
      password,
      code,
    });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormWrapper}>
        <Form
          name="loginForm"
          style={{
            width: 400,
            maxWidth: 600,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            padding: 20,
            borderRadius: 20,
          }}
          autoComplete="off"
          onFinish={handleLogin}
        >
          <div className={styles.formHeader}>
            <img src={Logo} alt="logo" />
            <h1>Nest React Admin</h1>
          </div>
          <Form.Item<ILoginParams>
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input
              type="email"
              prefix={<MailOutlined />}
              placeholder="请输入邮箱"
            />
          </Form.Item>
          <Form.Item<ILoginParams>
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Row gutter={20} style={{ margin: 0 }}>
            <Col span={16} style={{ padding: 0 }}>
              <Form.Item<ILoginParams>
                name="code"
                rules={[{ required: true, message: '请输入验证码' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="请输入验证码" />
              </Form.Item>
            </Col>
            <Col span={8} style={{ padding: 0 }}>
              {codeInfo ? (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    codeInfo?.data as string,
                  )}`}
                  alt="code"
                  style={{ width: '100%', height: 50, cursor: 'pointer' }}
                  onClick={fetchCode}
                />
              ) : (
                <Button
                  type={'primary'}
                  style={{
                    width: '90%',
                    position: 'absolute',
                    top: 5,
                    right: 0,
                  }}
                  onClick={fetchCode}
                >
                  获取验证码
                </Button>
              )}
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
