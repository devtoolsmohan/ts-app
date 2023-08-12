import jwt from 'jsonwebtoken';

export const login = async (credentials: any) => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            return { success: true, error: null };
        } else if (response.status === 401) {
            return { success: false, error: 'Invalid email or password.' };
        } else {
            return { success: false, error: 'Error logging in. Please try again.' };
        }
    } catch (error) {
        return { success: false, error: 'Error logging in. Please try again.' };
    }
};


export const signup = async (userData: any) => {
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        console.log("jmkhkjhjkhjkhk==========")
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

