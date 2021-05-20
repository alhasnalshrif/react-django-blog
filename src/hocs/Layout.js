import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Layout.css";
import { Layout, Breadcrumb, Menu, Avatar, Col } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

import { checkAuthenticated, load_user, logout } from "../redux/auth/authAction";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';


const { Content, Footer } = Layout;
const { Header } = Layout;


const CustomLayout = withRouter((props) => {

	const selectedItem = `/${props.location.pathname.split('/')[1]}`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				await props.checkAuthenticated();
				// await props.load_user();
			} catch (err) { }
		};

		fetchData();
	}, [props]);

	const authLinks = (

		<Menu theme="dark" mode="horizontal" selectedKeys={[selectedItem]}>
			<Menu.Item>
				<a className="nav-link" onClick={props.logout} href="#!">
					Logout
			</a>
			</Menu.Item>

		</Menu >
	);

	const guestLinks = (
		<>
			<Menu theme="dark" mode="horizontal" selectedKeys={[selectedItem]}>
				<Menu.Item key="/login" >
					<NavLink exact to="/login">
						Login
				</NavLink>
				</Menu.Item>
				<Menu.Item key="/signup" >
					<NavLink exact to="/signup">
						Sign Up
				</NavLink>
				</Menu.Item>

			</Menu>
		</>
	);
	return (

		<Layout>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

				{<>{props.isAuthenticated ? authLinks : guestLinks}</>}



			</Header>
			<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
					{props.children}
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>alhassn</Footer>
		</Layout>

	);
}
);



const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, { logout, checkAuthenticated, load_user })(CustomLayout);

