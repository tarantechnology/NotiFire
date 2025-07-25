"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/app/components/form/input";
import Button from "@/app/components/button";
import { signup } from "./actions";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, _setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 overflow-hidden fixed inset-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#ffdbbb] mb-2 font-(family-name:--font-eb-garamond)">
            Create Account
          </h1>
          <p className="text-gray-400 font-(family-name:--font-eb-garamond)">
            Join Notifire today
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-800/50 text-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <form
          className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6"
          action={signup}
        >
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            helperText="Must be at least 8 characters"
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className={`
              w-full
              px-6
              py-3
              bg-[#ffdbbb]
              text-gray-900
              rounded-lg
              font-bold
              transition-opacity
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}'
            `}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-400 font-(family-name:--font-eb-garamond)">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#ffdbbb] hover:underline font-(family-name:--font-eb-garamond)"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
