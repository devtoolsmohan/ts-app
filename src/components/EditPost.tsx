import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {editPost, getPost} from '../api/postApi';
import Layout from './Layout';

interface Post {
    id: number;
    name: string;
    description: string;
    date: any;
    userid: number;
}

function EditPost() {
    const [post, setPost] = useState<Post>({id: 0, name: '', userid: 0, date: '', description: ''});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const {id} = useParams<{ id: any }>();
    const history = useHistory();

    useEffect(() => {
        fetchAndSetPost();
    }, []);

    const fetchAndSetPost = async () => {
        try {
            const postDataResult = await getPost(Number(id));
            console.log('postDataResult:', postDataResult);

            if (!postDataResult.error) {
                const postResult = postDataResult.post;

                setPost(postResult);
                setName(postResult.name);
                setDescription(postResult.description);
                setDate(postResult.date);
            } else {
                history.push(`/`);

            }
        } catch (error) {
            history.push(`/`);
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation
        if (!name || !description || !date) {
            setError('All fields are required.');
            return;
        }

        setError('');

        const postData = {id: post.id, name, description, date, userid: post.userid};

        const result = await editPost(postData, id);

        if (result.success) {
            history.push(`/`);
        } else {
            setError(result.error || 'Error updating post. Please try again.');
        }
    };

    return (
        <Layout>
            <div>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Save</button>
                </form>
            </div>
        </Layout>
    );
}

export default EditPost;
