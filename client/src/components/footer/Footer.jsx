import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../header/icon/logo.svg'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-container container">
                <div className="footer-content-1 row">
                    <div className="footer-contact col-12 col-xl-5 d-flex flex-column align-items-center align-items-xl-start">
                        <div className="footer-logo">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="footer-phone">
                            <i className="fas fa-phone-volume"></i>
                            <span>0979 825 323</span>
                        </div>
                        <div className="footer-contact">
                            Kim Bảng - Hà Nam - Việt Nam
                        </div>
                    </div>
                    <div className="footer-content-widget col-12 col-xl-7 container d-flex align-items-center justify-content-center">
                        <div className="row footer-row">
                            <div className="footer-menu col-12 col-md-4">
                                <h2 className="widget-title">Danh mục</h2>
                                <div className="menu-footer-1-container">
                                    <ul>
                                        <li>
                                            <Link to="/">Pizza</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Burgers</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Sushi</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Noodles</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-menu col-12 col-md-4">
                                <h2 className="widget-title">Về chúng tôi</h2>
                                <div className="menu-footer-1-container">
                                    <ul>
                                        <li>
                                            <Link to="/">Giới thiệu</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Liên hệ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-menu col-12 col-md-4">
                                <h2 className="widget-title">Hỗ trợ</h2>
                                <div className="menu-footer-1-container">
                                    <ul>
                                        <li>
                                            <Link to="/">Chính sách</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Điều khoản</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Câu hỏi thường gặp</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content-2">
                    <div className="footer-copyright">
		                © Copyright 2021 by Luu The Viet
                    </div>
                    <div className="footer-soical">
                        <div className="footer-soical-container">
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-google"></i>
                            <i className="fab fa-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;