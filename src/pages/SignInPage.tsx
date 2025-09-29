import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Simulate sign in - in a real app, this would call an API
    console.log("Sign in attempt:", formData);
    
    // For demo purposes, redirect to browse page
    navigate(`/${MAIN_PATH.browse}`);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.8) 100%
          ),
          url('https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="sm">
        {/* Netflix Header */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
          }}
        >
          <Box
            component="img"
            src="/assets/netflix-logo.png"
            alt="Netflix"
            sx={{
              height: 45,
              filter: "brightness(1.2)",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/assets/netflix-logo.png"
            alt="Netflix"
            sx={{
              height: 40,
              mb: 3,
              filter: "brightness(1.2)",
            }}
          />
        </Box>

        <Paper
          elevation={24}
          sx={{
            p: 4,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 3,
              textAlign: "center",
            }}
          >
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, backgroundColor: "rgba(244, 67, 54, 0.1)" }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email or phone number"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e50914",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-focused": {
                    color: "#e50914",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e50914",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-focused": {
                    color: "#e50914",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      "&.Mui-checked": {
                        color: "#e50914",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                href="#"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Need help?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                mb: 3,
                backgroundColor: "#e50914",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#f40612",
                },
                "&:active": {
                  backgroundColor: "#b8070f",
                },
              }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                New to Netflix?{" "}
                <Link
                  component={RouterLink}
                  to={`/${MAIN_PATH.signUp}`}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up now.
                </Link>
              </Typography>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.8rem" }}>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Learn more.
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
