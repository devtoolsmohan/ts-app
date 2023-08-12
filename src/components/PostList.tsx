import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/postApi';
import {useHistory} from "react-router-dom";

interface Post {
    id: number;
    userid: number;
    name: string;
    description: string;
    date: string;
}

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const history = useHistory();
    useEffect(() => {
        fetchAndSetPosts();
    }, []);

    const fetchAndSetPosts = async () => {
        try {
            const postsData = await fetchPosts();
            console.log("-----------postsData",postsData)
            setPosts(postsData);
        } catch (error) {
            // Handle error if needed
        }
    };

    const handleEdit = (postId: number) => {
        history.push(`/posts/edit/${postId}`);
    };

    const handleDelete = (postId: number) => {
        console.log('Delete post:', postId);
    };

    const handleNewPost = () => {
        history.push('/posts/new');
    };

    return (
        <div>
            <button onClick={() => handleNewPost()}>Create New</button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.name}</td>
                        <td>{post.description}</td>
                        <td>{post.date}</td>
                        <td>
                            <button onClick={() => handleEdit(post.id)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PostList;
