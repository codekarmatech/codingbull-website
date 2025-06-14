import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../utils/accessibility';

// Custom shouldForwardProp function to filter out non-DOM props
const shouldForwardProp = prop =>
  !['variant', 'size', 'fullWidth', 'whileHover', 'whileTap'].includes(prop);

// Button variants using theme variables
const VARIANTS = {
  primary: {
    background: props => props.theme.colors.buttonPrimary,
    color: props => props.theme.colors.textPrimary,
    border: 'none',
    boxShadow: props => props.theme.shadows.buttonPrimary,
  },
  secondary: {
    background: 'rgba(0, 112, 255, 0.1)',
    color: props => props.theme.colors.electricBlue,
    border: props => `2px solid ${props.theme.colors.electricBlue}`,
    boxShadow: props => props.theme.shadows.buttonSecondary,
  },
  outline: {
    background: 'transparent',
    color: props => props.theme.colors.textPrimary,
    border: props => `2px solid ${props.theme.colors.textPrimary}`,
    boxShadow: props => props.theme.shadows.sm,
  },
  ghost: {
    background: 'transparent',
    color: props => props.theme.colors.electricBlue,
    border: 'none',
    boxShadow: 'none',
  },
};

// Button sizes
const SIZES = {
  sm: {
    padding: '0.5rem 1rem',
    fontSize: props => props.theme.fontSizes.sm,
  },
  md: {
    padding: '0.75rem 1.5rem',
    fontSize: props => props.theme.fontSizes.md,
  },
  lg: {
    padding: '1rem 2rem',
    fontSize: props => props.theme.fontSizes.lg,
  },
};

const StyledButton = styled(motion.button).withConfig({
  shouldForwardProp
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.animations.mediumBounce};
  position: relative;
  overflow: hidden;
  z-index: 1;

  // Apply variant styles
  background: ${props => props.variant && VARIANTS[props.variant] ? VARIANTS[props.variant].background : VARIANTS.primary.background};
  color: ${props => props.variant && VARIANTS[props.variant] ? VARIANTS[props.variant].color : VARIANTS.primary.color};
  border: ${props => props.variant && VARIANTS[props.variant] ? VARIANTS[props.variant].border : VARIANTS.primary.border};
  box-shadow: ${props => props.variant && VARIANTS[props.variant] ? VARIANTS[props.variant].boxShadow : '0 4px 15px rgba(106, 13, 173, 0.4)'};

  // Apply size styles
  padding: ${props => props.size && SIZES[props.size] ? SIZES[props.size].padding : SIZES.md.padding};
  font-size: ${props => props.size && SIZES[props.size] ? SIZES[props.size].fontSize : SIZES.md.fontSize};

  // Full width option
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  // Disabled state
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  // Glow effect
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: ${props => props.variant === 'primary' 
      ? 'linear-gradient(135deg, #9b30ff 0%, #6a0dad 50%, #9b30ff 100%)' 
      : props.variant === 'secondary' 
        ? 'linear-gradient(135deg, #00bfff 0%, #0070ff 50%, #00bfff 100%)'
        : 'transparent'};
    opacity: 0;
    border-radius: inherit;
    transition: opacity 0.3s ease-out;
    filter: blur(8px);
  }

  // Hover effect (when not disabled) using theme variables
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'primary' 
      ? props.theme.shadows.buttonHoverPrimary
      : props.variant === 'secondary' 
        ? props.theme.shadows.buttonHoverSecondary
        : props.variant === 'outline'
          ? '0 8px 25px rgba(255, 255, 255, 0.2)'
          : 'none'};

    &::before {
      opacity: 0.7;
    }

    ${props => props.variant === 'primary' && `
      background: ${props.theme.colors.buttonHoverPrimary};
    `}

    ${props => props.variant === 'secondary' && `
      background: rgba(0, 112, 255, 0.2);
      color: ${props.theme.colors.neonCyan};
      border-color: ${props.theme.colors.neonCyan};
    `}

    ${props => props.variant === 'outline' && `
      background: ${props.theme.colors.overlayLight};
    `}

    ${props => props.variant === 'ghost' && `
      background: rgba(0, 191, 255, 0.15);
      text-shadow: ${props.theme.colors.glowBlue};
    `}
  }

  // Focus state using theme variables
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.3), 
                ${props => props.variant === 'primary' 
                  ? props.theme.shadows.buttonHoverPrimary
                  : props.variant === 'secondary' 
                    ? props.theme.shadows.buttonHoverSecondary
                    : '0 8px 25px rgba(255, 255, 255, 0.2)'};
  }

  // Active state using theme variables
  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: ${props => props.variant === 'primary' 
      ? props.theme.shadows.buttonPrimary
      : props.variant === 'secondary' 
        ? props.theme.shadows.buttonSecondary
        : props.variant === 'outline'
          ? props.theme.shadows.sm
          : 'none'};
  }

  // Enhanced ripple effect using theme variables
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: ${props => props.variant === 'primary' 
      ? 'rgba(155, 48, 255, 0.5)' 
      : props.variant === 'secondary' 
        ? 'rgba(0, 191, 255, 0.5)'
        : 'rgba(255, 255, 255, 0.5)'};
    transform: scale(0);
    animation: ripple 0.8s ${props => props.theme.animations.bounce};
    pointer-events: none;
  }

  @keyframes ripple {
    to {
      transform: scale(5);
      opacity: 0;
    }
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaPressed,
  role,
  ...props
}) => {
  const reducedMotion = prefersReducedMotion();

  // Ripple effect handler
  const createRipple = (event) => {
    if (disabled || loading || reducedMotion) return;

    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    // Remove existing ripples
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    createRipple(event);
    onClick?.(event);
  };

  const handleKeyDown = (event) => {
    // Handle Enter and Space keys for better accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  // Filter out custom props that shouldn't be passed to DOM elements
  const { whileHover, whileTap, ...buttonProps } = props;

  // Create enhanced motion props object with more dynamic animations
  const motionProps = !disabled && !loading && !reducedMotion ? {
    whileHover: { 
      scale: 1.05,
      y: -3,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    whileTap: { 
      scale: 0.95, 
      y: 2,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15 
      }
    },
    initial: { 
      y: 0,
      scale: 1
    },
    animate: { 
      y: [0, -3, 0],
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  } : {};

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type={type}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      role={role}
      tabIndex={disabled ? -1 : 0}
      {...motionProps}
      {...buttonProps}
    >
      {loading ? (
        <>
          <span aria-live="polite" aria-label="Loading">
            Loading...
          </span>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;