import React, { useState } from 'react';
import { Form, Input, Button, Modal, Checkbox } from 'antd';
import { getLoginResponse } from '../../api/login';

interface Props {
    login: Function;
}

const Login = ({ login }: Props) => {
    const [ error, setError ] = useState(false);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const handleLogin = async e => {
        const response = await getLoginResponse(e);
        if (!response.success) {
            setError(true);
        } else {
            login();
        }
    }
    return (
        <>
        <Form onFinish={handleLogin} {...layout} style={{marginTop: '20px'}}>
            <Form.Item label="Email" name="email" rules={[{ required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <Modal title="Error" visible={error} onCancel={() => setError(false)} onOk={() => setError(false)}>
            Wrong Username or Password
        </Modal>
        </>
    );
}

export default Login;