import React from 'react';
import './AppFooter.css';

const AppFooter = () => {
    return (
        <footer className="app-footer">
            <div className="app-footer__content">
                <div className="app-footer__left">
                    <p>© 2026 ZMS — Zoo Management Service. All rights reserved.</p>
                </div>
                <div className="app-footer__right">
                    <div className="app-footer__links">
                        <a href="#support">Support</a>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                    <div className="app-footer__status">
                        <span className="app-footer__status-dot"></span>
                        System Operational
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
