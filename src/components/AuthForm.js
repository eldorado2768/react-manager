import React, { useState } from "react";
import { Form, Button, InputGroup, Spinner } from "react-bootstrap"; // Import Bootstrap components
import Icon from "./Icon";
import CustomAlert from "./CustomAlert"; // Use our custom alert component

const AuthForm = ({
  supabase,
  onLoginSuccess,
  onSignUpClick,
  onForgotPasswordClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    if (!supabase) {
      setAlert({ message: "Supabase not configured.", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      setAlert({
        message: "Login successful! Redirecting...",
        type: "success",
      });
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        message: error.message || "Login failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="glass-effect rounded-2xl p-4 shadow-2xl">
      {" "}
      {/* p-4 instead of p-8 for Bootstrap spacing */}
      <Form onSubmit={handleLogin}>
        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="block text-white text-sm font-medium mb-2">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none input-focus"
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="block text-white text-sm font-medium mb-2">
            Password
          </Form.Label>
          <InputGroup>
            {" "}
            {/* Use InputGroup for appending eye icon */}
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none input-focus"
            />
            <Button
              variant="link" // Makes the button look like a link, for icon
              onClick={togglePasswordVisibility}
              className="position-absolute end-0 top-50 translate-middle-y text-white/60 hover:text-white"
              style={{ zIndex: 10 }} // Ensure icon is clickable
            >
              <Icon
                className="w-5 h-5"
                path={
                  showPassword
                    ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                }
              />
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Remember Me & Forgot Password */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Check
            type="checkbox"
            id="rememberMe"
            label="Remember me"
            className="text-white/80" // Apply custom text color
          />
          <Button
            variant="link"
            onClick={onForgotPasswordClick}
            className="text-white/80 hover:text-white text-sm transition-colors text-decoration-underline" // Bootstrap's text-decoration-underline for underline
          >
            Forgot password?
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          variant="light" // White button
          type="submit"
          className="w-100 py-3 mb-3 btn-hover" // w-100 for full width, py-3 for padding
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Divider */}
        <div className="position-relative mb-3">
          <hr className="text-white-50 opacity-25" />{" "}
          {/* Bootstrap hr with opacity */}
          <div className="position-absolute top-50 start-50 translate-middle px-2 bg-transparent text-white-50">
            Don't have an account?
          </div>
        </div>

        {/* Sign Up Link */}
        <Button
          variant="outline-light" // Outline button with light color
          onClick={onSignUpClick}
          className="w-100 py-3"
          disabled={isLoading}
        >
          Create Account
        </Button>
      </Form>
      {alert && (
        <div className="mt-3">
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AuthForm;
