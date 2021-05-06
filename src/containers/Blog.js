import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { Card, List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { getPosts } from "../redux/post/postAction";



const { Meta } = Card;

const Blog = (props) => {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await props.getPosts();
                
                setposts(props.allPosts);
                console.log(props.allPosts);

            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, []);

    console.log(posts)



    return (

        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={posts}

            renderItem={item => (
                <List.Item
                    key={item.title}

                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />



    );
};

const mapStateToProps = (state) => ({
    allPosts: state.post.posts
});

export default connect(mapStateToProps, { getPosts })(Blog);
