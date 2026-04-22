import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [scrolled, setScrolled] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('zoo-theme');
        return saved ? saved === 'dark' : false;
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (window.scrollY > 200) {
                setStatsVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('zoo-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(prev => !prev);

    const featuredAnimals = [
        {
            name: 'African Giraffe',
            species: 'Giraffa camelopardalis',
            image: '/animals_section.jpg',
            description: 'The tallest living terrestrial animal, known for its long neck and distinctive coat patterns.'
        },
        {
            name: 'Bengal Tiger',
            species: 'Panthera tigris tigris',
            image: '/tiger_section.jpg',
            description: 'A majestic big cat species with striking orange coat and black stripes, native to Asia.'
        },
        {
            name: 'African Elephant',
            species: 'Loxodonta africana',
            image: '/elephant_section.jpg',
            description: 'The largest living land animal, known for intelligence and complex social behaviors.'
        }
    ];

    const features = [
        {
            icon: '🎟️',
            title: 'Online Ticket Booking',
            description: 'Book your visit in advance with our seamless digital ticketing system. Skip the lines and enjoy your day.'
        },
        {
            icon: '🗺️',
            title: 'Interactive Zoo Map',
            description: 'Navigate through our park with an interactive map showing all habitats, facilities, and points of interest.'
        },
        {
            icon: '🦁',
            title: 'Live Feeding Shows',
            description: 'Watch daily feeding schedules and special animal shows. Get up close with your favorite species.'
        },
        {
            icon: '🩺',
            title: 'Animal Health Tracking',
            description: 'Our dedicated team monitors every animal\'s health with advanced veterinary care and daily checkups.'
        },
        {
            icon: '👨‍💼',
            title: 'Staff Management',
            description: 'Efficient workforce management ensuring every habitat has trained zookeepers providing the best care.'
        },
        {
            icon: '📊',
            title: 'Financial Reports',
            description: 'Comprehensive financial analytics and reporting for transparent and efficient zoo operations.'
        }
    ];

    const stats = [
        { icon: '🐾', number: '150+', label: 'Animal Species' },
        { icon: '🌍', number: '50+', label: 'Habitats' },
        { icon: '👥', number: '10K+', label: 'Monthly Visitors' },
        { icon: '⭐', number: '4.8', label: 'User Rating' }
    ];

    return (
        <div className="home-page-wrapper" style={{ background: darkMode ? '#0f172a' : '#ffffff', minHeight: '100vh', transition: 'background 0.4s ease', color: darkMode ? '#f8fafc' : '#1e293b' }}>
            {/* Navigation */}
            <nav className={`home-nav ${scrolled ? 'home-nav--scrolled' : ''}`}>
                <div className="home-nav__inner">
                    <div className="home-nav__brand">
                        <div className="home-nav__logo">ZMS</div>
                        <span className="home-nav__name">Zoo Management</span>
                    </div>
                    <div className="home-nav__links">
                        <a href="#animals" className="home-nav__link">Animals</a>
                        <a href="#features" className="home-nav__link">Features</a>
                        <a href="#visit" className="home-nav__link">Plan Visit</a>
                        <Link to="/login" className="home-nav__link">Sign In</Link>
                        <button
                            className={`theme-toggle ${!darkMode ? 'theme-toggle--light' : ''}`}
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            <span className="theme-toggle__icon">🌙</span>
                            <span className="theme-toggle__icon">☀️</span>
                            <span className="theme-toggle__slider"></span>
                        </button>
                        <Link to="/register" className="home-nav__btn">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="home-hero">
                <div
                    className="home-hero__bg"
                    style={{ backgroundImage: `url('/hero_zoo.jpg')` }}
                />
                <div className="home-hero__overlay" />
                <div className="home-hero__content">
                    <div className="home-hero__badge">
                        <span className="home-hero__badge-dot"></span>
                        Zoo Management Service — Now Open
                    </div>
                    <h1 className="home-hero__title">
                        Where Wildlife Meets Wonder
                    </h1>
                    <p className="home-hero__subtitle">
                        Experience the magic of nature up close. Explore over 150 species,
                        book your visit online, and dive into the world of wildlife conservation.
                    </p>
                    <div className="home-hero__actions">
                        <Link to="/register" className="home-hero__btn-primary">
                            Start Exploring →
                        </Link>
                        <a href="#animals" className="home-hero__btn-secondary">
                            Meet Our Animals
                        </a>
                    </div>
                </div>
                <div className="home-hero__scroll">
                    <div className="home-hero__scroll-mouse">
                        <div className="home-hero__scroll-dot"></div>
                    </div>
                    <span className="home-hero__scroll-text">Scroll</span>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="home-stats">
                <div className="home-stats__inner">
                    {stats.map((stat, index) => (
                        <div
                            className="home-stats__card"
                            key={index}
                            style={{
                                animation: statsVisible
                                    ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                    : 'none'
                            }}
                        >
                            <span className="home-stats__icon">{stat.icon}</span>
                            <div className="home-stats__number">{stat.number}</div>
                            <div className="home-stats__label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Animals */}
            <section className="home-animals" id="animals">
                <div className="home-section__header">
                    <div className="home-section__tag">Featured Residents</div>
                    <h2 className="home-section__title">Meet Our Amazing Animals</h2>
                    <p className="home-section__desc">
                        From majestic big cats to gentle giants, explore the diverse wildlife
                        that calls our zoo home.
                    </p>
                </div>
                <div className="home-animals__grid">
                    {featuredAnimals.map((animal, index) => (
                        <div
                            className="home-animals__card"
                            key={index}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <img
                                className="home-animals__card-img"
                                src={animal.image}
                                alt={animal.name}
                                loading="lazy"
                            />
                            <div className="home-animals__card-overlay">
                                <div className="home-animals__card-name">{animal.name}</div>
                                <div className="home-animals__card-species">{animal.species}</div>
                                <div className="home-animals__card-desc">{animal.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="home-features" id="features">
                <div className="home-section__header">
                    <div className="home-section__tag">System Features</div>
                    <h2 className="home-section__title">Everything You Need</h2>
                    <p className="home-section__desc">
                        A complete management platform designed for visitors, zookeepers,
                        and administrators alike.
                    </p>
                </div>
                <div className="home-features__grid">
                    {features.map((feature, index) => (
                        <div className="home-features__card" key={index}>
                            <div className="home-features__icon">{feature.icon}</div>
                            <div className="home-features__card-title">{feature.title}</div>
                            <div className="home-features__card-desc">{feature.description}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="home-cta" id="visit">
                <div className="home-cta__glow home-cta__glow--purple"></div>
                <div className="home-cta__glow home-cta__glow--pink"></div>
                <div className="home-cta__content">
                    <div className="home-section__tag">Plan Your Visit</div>
                    <h2 className="home-cta__title">Ready for an Unforgettable Adventure?</h2>
                    <p className="home-cta__desc">
                        Join thousands of visitors who have experienced the wonder of wildlife.
                        Create your account today and start planning your perfect zoo day.
                    </p>
                    <div className="home-hero__actions">
                        <Link to="/register" className="home-hero__btn-primary">
                            Create Free Account →
                        </Link>
                        <Link to="/login" className="home-hero__btn-secondary">
                            Already a Member? Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="home-footer__inner">
                    <div className="home-footer__brand">
                        <div className="home-footer__logo">ZMS</div>
                        <span className="home-footer__name">Zoo Management Service</span>
                    </div>
                    <div className="home-footer__copy">
                        © 2026 Zoo Management Service. All rights reserved.
                    </div>
                    <div className="home-footer__links">
                        <a href="#animals" className="home-footer__link">Animals</a>
                        <a href="#features" className="home-footer__link">Features</a>
                        <Link to="/login" className="home-footer__link">Sign In</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
