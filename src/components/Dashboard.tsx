import React from 'react';
import PostList from './PostList';
import Layout from './Layout';
function Dashboard() {
    return (
        <Layout>
            <div>
                <h2>Posts</h2>
                <PostList />
            </div>
        </Layout>
    );
}

export default Dashboard;