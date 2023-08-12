import axios from 'axios';

interface Post {
    id: number;
    userid: number;
    name: string;
    description: string;
    date: string;
}
const token = localStorage.getItem('token');


export const newPost = async (postData: any) => {
    try {
        const response = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        });
        if (response.ok) {
            return { success: true };
        } else if (response.status === 400) {
            const data = await response.json();
            return { success: false, error: data.error };
        } else {
            return { success: false, error: 'Error signing up. Please try again.' };
        }
    } catch (error) {
        return { success: false, error: 'Error signing up. Please try again.' };
    }
};
export const editPost = async (postData: any, postId: number) => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        });
        if (response.ok) {
            return { success: true };
        } else if (response.status === 400) {
            const data = await response.json();
            return { success: false, error: data.error };
        } else {
            return { success: false, error: 'Error signing up. Please try again.' };
        }
    } catch (error) {
        return { success: false, error: 'Error signing up. Please try again.' };
    }
};
export const deletePost = async (postId: number): Promise<{ success: boolean; error?: string }> => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: 'DELETE', // Use 'DELETE' instead of 'Delete'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return { success: true };
        } else if (response.status === 400) {
            const data = await response.json();
            return { success: false, error: data.error };
        } else {
            return { success: false, error: 'Error deleting the post. Please try again.' };
        }
    } catch (error) {
        return { success: false, error: 'Error deleting the post. Please try again.' };
    }
};


export const getPost = async (postId: any): Promise<{ post: object; error?: string }> => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const postData = await response.json();
            return { post: postData };
        } else if (response.status === 400) {
            const data = await response.json();
            return { post: {}, error: data.error };
        } else {
            return { post: {}, error: 'Error fetching the post. Please try again.' };
        }
    } catch (error) {
        return { post: {}, error: 'Error fetching the post. Please try again.' };
    }
};


export const fetchPosts = async (): Promise<Post[]> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const response = await axios.get('http://localhost:5000/api/posts', { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
