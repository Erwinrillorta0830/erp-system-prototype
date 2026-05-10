"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, User, Lock, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after success animation
      setTimeout(() => {
        router.push("/");
      }, 600);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground flex items-center justify-center selection:bg-amber-500/30 overflow-hidden transition-colors duration-300">
      {/* Motor Parts Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none bg-repeat animate-[pulse_10s_ease-in-out_infinite]"
        style={{ backgroundImage: 'url("/motor_parts_bg.png")', backgroundSize: '400px' }}
      />
      
      {/* Ambient Light Blobs */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/[0.05] blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-yellow-600/[0.05] blur-[100px] pointer-events-none z-0" />

      {/* Theme Toggle in Corner */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className={`relative z-10 w-full max-w-md mx-auto px-6 transition-all duration-700 ${isSuccess ? 'scale-110 opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'}`}>
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 animate-in slide-in-from-top-8 fade-in duration-1000">
          <div className="relative h-20 w-auto flex items-center justify-center mb-4">
            <Image 
              src="/image.png" 
              alt="MMPA Logo" 
              width={240} 
              height={80} 
              className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
              priority
            />
            <div className="absolute -right-3 -top-2">
              <Settings className="h-6 w-6 text-amber-500 animate-gear" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-mmpa-gold">
            System Portal
          </h1>
          <p className="text-xs text-muted-foreground font-bold tracking-[0.2em] uppercase mt-2">
            Authorized Personnel Only
          </p>
        </div>

        {/* Login Card */}
        <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl p-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/0 opacity-50 pointer-events-none" />
          
          <form onSubmit={handleLogin} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-muted/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-amber-500/50 sm:text-sm transition-all"
                  placeholder="Username or Employee ID"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-muted/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-amber-500/50 sm:text-sm transition-all"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-border rounded bg-muted"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-muted-foreground font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-xs">
                <a href="#" className="font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-zinc-950 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-background transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-70"
            >
              {isLoading ? (
                <Settings className="h-5 w-5 animate-gear text-zinc-900" />
              ) : isSuccess ? (
                <span className="text-zinc-900">Access Granted</span>
              ) : (
                <>
                  <span className="text-zinc-900">Engage System</span>
                  <ArrowRight className="h-4 w-4 text-zinc-900 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-in fade-in duration-1000 delay-300">
          <p className="text-[10px] text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} MMPA Thai Parts & Accessories. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
