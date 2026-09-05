import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name);
    navigate("/claims");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white dark:bg-[#0f172a] p-8 rounded-xl shadow-sm border border-border">
        <h2 className="mb-6 text-2xl font-bold text-foreground text-center">
          Login
        </h2>

        <div className="mb-4 grid gap-2">
          <Label htmlFor="name" className="text-foreground">
            Your Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name to login..."
          />
        </div>

        <Button
          onClick={handleLogin}
          disabled={name.trim() === ""}
          className="w-full mt-2"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
