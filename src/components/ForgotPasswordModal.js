
import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap'; // Import Bootstrap components
import CustomAlert from './CustomAlert'; // Use our custom alert component

const ForgotPasswordModal = ({ isOpen, onClose, supabase }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);

        if (!supabase) {
            setAlert({ message: 'Supabase not configured.', type: 'error' });
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password'
            });

            if (error) throw error;
            setAlert({ message: 'Password reset link sent to your email!', type: 'success' });
            setEmail('');
            setTimeout(onClose, 1500);
        } catch (error) {
            console.error('Reset password error:', error);
            setAlert({ message: error.message || 'Failed to send reset link. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered className="glass-effect-modal">
            {/* The 'glass-effect' is specific to the content box, not the backdrop usually.
                We'll apply it via a custom class or inline style if needed.
                Bootstrap's modal has its own styling for the backdrop.
            */}
            <div className="glass-effect rounded-2xl p-4"> {/* Apply glass effect here */}
                <Modal.Header closeButton className="border-0 pb-0"> {/* Remove default border */}
                    <Modal.Title className="text-white text-2xl font-bold">Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2">
                    <p className="text-white/80 mb-4">Enter your email address and we'll send you a link to reset your password.</p>

                    <Form onSubmit={handleResetPassword}>
                        <Form.Group className="mb-3" controlId="formResetEmail">
                            <Form.Label className="block text-white text-sm font-medium mb-2">Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none input-focus" // Keep custom styling
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-4">
                            <Button
                                variant="outline-light" // Bootstrap outline button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-grow-1 me-2" // flex-grow-1 and margin-end
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="light" // White button
                                type="submit"
                                disabled={isLoading}
                                className="flex-grow-1 ms-2" // flex-grow-1 and margin-start
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>
                        </div>
                    </Form>
                    {alert && (
                        <div className="mt-3">
                            <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
                        </div>
                    )}
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;