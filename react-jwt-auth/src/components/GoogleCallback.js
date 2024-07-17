import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.googleLogin().then(
      (user) => {
        if (user.roles.includes("ROLE_ADMIN")) {
          navigate("/admin");
        } else if (user.roles.includes("ROLE_MODERATOR")) {
          navigate("/mod");
        } else {
          navigate("/user");
        }
        window.location.reload();
      },
      (error) => {
        console.error("Google login error", error);
        navigate("/login");
      }
    );
  }, [navigate]);

  return <div>Chargement...</div>;
}

export default GoogleCallback;