import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/dashboard" className="nav-item nav-link">Dashboard</NavLink>
                <NavLink href="/run-automation" className="nav-item nav-link">Run automation</NavLink>
                <NavLink href="/network-formation" className="nav-item nav-link">Network Formation</NavLink>
                <NavLink href="/playground" className="nav-item nav-link">Playground</NavLink>
 
                <a onClick={logout} className="nav-item nav-link">Logout</a>
                <a className='nav-item nav-link'>|</a>
                <a className='nav-item nav-link'>{userService.userValue?.firstName}</a>
                
            </div>
        </nav>
    );
}