import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../redux/auth/authAction";
import { Form, Input, Button} from "antd";

const Signup = ({ signup, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		re_password: "",
	});

	const [accountCreated, setAccountCreated] = useState(false);

	const { name, email, password, re_password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		if (password === re_password) {
			signup({ name, email, password, re_password });
			setAccountCreated(true);
		}
	};
	const onFinish = (e) => {
		if (password === re_password) {
			signup({ name, email, password, re_password });
			setAccountCreated(true);
		}
	};
	if (isAuthenticated) return <Redirect to="/" />;
	if (accountCreated) return <Redirect to="login" />;

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<h1>Sign Up</h1>
			<p>Create your Account</p>
			<Form.Item
				label="Full Name"
				rules={[{ required: true, message: "Please input your Name!" }]}
			>
				<Input
					
					type="text"
					placeholder="Name*"
					name="name"
					value={name}
					onChange={(e) => onChange(e)}
					required
				/>
			</Form.Item>
			<Form.Item
				label="E-mail"
				rules={[
					{
						type: "email",
						message: "The input is not valid E-mail!",
					},
					{
						required: true,
						message: "Please input your E-mail!",
					},
				]}
			>
				<Input
				
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
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
				hasFeedback
			>
				<Input.Password
					
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
					minLength="6"
					required
				/>
			</Form.Item>
			<Form.Item
				label="Confirm Password"
				hasFeedback
				rules={[
					{
						required: true,
						message: "Please confirm your password!",
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								"The two passwords that you entered do not match!"
							);
						},
					}),
				]}
			>
				<Input.Password
					type="password"
					placeholder="Confirm Password"
					name="re_password"
					value={re_password}
					onChange={(e) => onChange(e)}
					minLength="6"
					required
				/>
			</Form.Item>
			<Form.Item>
				Already have an account? <Link to="/login">Sign In</Link>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
			</Form.Item>
		</Form>
		// <div className='container mt-5'>
		//     <h1>Sign Up</h1>
		//     <p>Create your Account</p>
		//     <form onSubmit={e => onSubmit(e)}>
		//         <div className='form-group'>
		//             <input
		//                 className='form-control'
		//                 type='text'
		//                 placeholder='Name*'
		//                 name='name'
		//                 value={name}
		//                 onChange={e => onChange(e)}
		//                 required
		//             />
		//         </div>
		//         <div className='form-group'>
		//             <input
		//                 className='form-control'
		//                 type='email'
		//                 placeholder='Email*'
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
		//                 placeholder='Password*'
		//                 name='password'
		//                 value={password}
		//                 onChange={e => onChange(e)}
		//                 minLength='6'
		//                 required
		//             />
		//         </div>
		//         <div className='form-group'>
		//             <input
		//                 className='form-control'
		//                 type='password'
		//                 placeholder='Confirm Password*'
		//                 name='re_password'
		//                 value={re_password}
		//                 onChange={e => onChange(e)}
		//                 minLength='6'
		//                 required
		//             />
		//         </div>
		//         <button className='btn btn-primary' type='submit'>Register</button>
		//     </form>
		//     <p className='mt-3'>
		//         Already have an account? <Link to='/login'>Sign In</Link>
		//     </p>
		// </div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
