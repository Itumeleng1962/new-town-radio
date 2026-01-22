import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-brand-lemon text-brand-gray hover:bg-white hover:text-black",
            secondary: "bg-white text-black hover:bg-neutral-200",
            outline: "border-2 border-brand-lemon text-brand-lemon hover:bg-brand-lemon hover:text-brand-gray",
            ghost: "text-neutral-400 hover:text-white hover:bg-white/5"
        };

        const sizes = {
            sm: "px-4 py-2 text-xs",
            md: "px-6 py-3 text-sm",
            lg: "px-8 py-4 text-base"
        };

        const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

        return (
            <button
                ref={ref}
                className={combinedClassName}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
