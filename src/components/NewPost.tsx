import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { newPost } from '../api/postApi';


function NewPost() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const userid = 3;

    const history = useHistory();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation
        if (!name || !description || !date ) {
            setError('All fields are required.');
            return;
        }

        setError('');


        const postData = { name, description, date, userid };

        const result = await newPost(postData);

        if (result.success) {
            history.push('/dashboard');
        } else {
            setError(result.error || 'Error signing up. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
                    <label htmlFor="lastName">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Date:</label>
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
    );
}


export default NewPost;
