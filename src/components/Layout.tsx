import React from 'react';


function Layout({ children }: { children: React.ReactNode }) {
    const handlesession = async () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <button onClick={() => handlesession()}>Logout</button>
            </nav>
            <div className="content">{children}</div>
        </div>
    );
}

export default Layout;
