import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/auth/authAction";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onFinish = (e) => {
		login(email, password);
	};

	if (isAuthenticated) return <Redirect to="/" />;

	return (
		<Form
			style={{ textAlign: "center" }}
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<h1>Sign In</h1>
			<p>Sign into your Account</p>
			<Form.Item
				label="E-mail"
				rules={[{ required: true, message: "Please input your Username!" }]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					type="email"
					placeholder="Email"
					name="email"
					value={email}
					onChange={(e) => onChange(e)}
					required
				/>
			</Form.Item>
			<Form.Item
				label="Password"
				rules={[{ required: true, message: "Please input your Password!" }]}
			>
				<Input.Password
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
					minLength="8"
					required
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Link to="/reset_password">Reset Password</Link>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				Or <Link to="/signup">Sign Up</Link>
			</Form.Item>
		</Form>

		// <div className='container mt-5'>
		//     <h1>Sign In</h1>
		//     <p>Sign into your Account</p>
		//     <form onSubmit={e => onSubmit(e)}>
		//         <div className='form-group'>
		//             <input
		//                 className='form-control'
		//                 type='email'
		//                 placeholder='Email'
		//                 name='email'
		//                 value={email}
		//                 onChange={e => onChange(e)}
		//                 required
		//             />
		//         </div>
		//         <div className='form-group'>
		//             <input
		//                 className='form-control'
		//                 type='password'
		//                 placeholder='Password'
		//                 name='password'
		//                 value={password}
		//                 onChange={e => onChange(e)}
		//                 minLength='6'
		//                 required
		//             />
		//         </div>
		//         <button className='btn btn-primary' type='submit'>Login</button>
		//     </form>
		//     <p className='mt-3'>
		//     Don't have an account? <Link to='/signup'>Sign Up</Link>
		//     </p>
		//     <p className='mt-3'>
		//     Forgot your Password? <Link to='/reset_password'>Reset Password</Link>
		//     </p>
		// </div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
