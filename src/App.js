// src/App.js
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Import Bootstrap layout components
import AuthForm from './components/AuthForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import useSupabase from './hooks/useSupabase';
import Icon from './components/Icon';
import CustomAlert from './components/CustomAlert'; // Use CustomAlert

function App() {
    const { supabase, supabaseError } = useSupabase();
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleLoginSuccess = () => {
        console.log('Login successful! Redirecting to dashboard...');
        // In a real app, you'd use React Router here or context for auth state.
        window.location.href = '/dashboard';
    };

    const handleSignUpClick = () => {
        console.log('Redirecting to sign up page...');
        // In a real app, you'd use React Router here.
        window.location.href = '/signup';
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 p-3"> {/* Bootstrap flexbox and padding */}
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6} xl={5}> {/* Responsive column sizing */}
                        {/* Logo/Brand Section */}
                        <div className="text-center mb-4"> {/* mb-4 for Bootstrap spacing */}
                            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-25 backdrop-blur-sm mb-3" style={{ width: '4rem', height: '4rem' }}>
                                <Icon className="w-50 h-50 text-white" path="M12 15v2m-6 4h12a2 2 0 002-2v6a2 2 0 00-2-2H6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </div>
                            <h1 className="text-white text-4xl font-bold mb-2">Welcome Back</h1> {/* Tailwind classes for font size/weight */}
                            <p className="text-white text-opacity-80">Sign in to your account</p> {/* Bootstrap text-opacity */}
                        </div>

                        <AuthForm
                            supabase={supabase}
                            onLoginSuccess={handleLoginSuccess}
                            onSignUpClick={handleSignUpClick}
                            onForgotPasswordClick={() => setIsForgotPasswordModalOpen(true)}
                        />

                        {supabaseError && (
                            <div className="mt-3">
                                <CustomAlert
                                    message={supabaseError.message}
                                    type="error"
                                    onClose={() => { /* No-op or specific handler */ }}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
                supabase={supabase}
            />
        </div>
    );
}

export default App;