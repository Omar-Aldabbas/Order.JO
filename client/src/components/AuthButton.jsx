import { Link } from "react-router-dom";
import { User2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export const AuthButton = () => {
  const { isAuth } = useAuthStore();

  return (
    <Link
      to={isAuth ? "/profile" : "/login"}
      className="bg-secondary hover:bg-mute hover:shadow-inner active:bg-mute active:shadow-inner rounded-full flex items-center gap-2 py-3 px-7 transition-all duration-200"
    >
      <User2
        size={25}
        fill="currentColor"
        className="p-1 rounded-full text-secondary bg-primary"
      />
      <span className="text-foreground">{isAuth ? "Profile" : "Login/Signup"}</span>
    </Link>
  );
};
