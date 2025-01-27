
// Unit tests for: Login

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSucess } from '../../Util';
import Login from '../Login';


import { fireEvent, render, screen } from '@testing-library/react';


// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the utility functions
// jest.mock("../../Util", () => ({
//   handleError: jest.fn(),
//   handleSucess: jest.fn(),
// }));

describe('Login() Login method', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  // Happy Path Tests
  describe('Happy Paths', () => {
    test('should render the login form correctly', () => {
      render(<Login />);
      expect(screen.getByText('Wellcome')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
      expect(screen.getByText('SignUp')).toBeInTheDocument();
    });

    test('should update state on input change', () => {
      render(<Login />);
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('password123');
    });

    test('should handle successful signup', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ success: true, message: 'Signup successful' }),
        })
      );

      render(<Login />);
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByText('SignUp'));

      await screen.findByText('SignUp'); // Wait for async actions

      expect(handleSucess).toHaveBeenCalledWith('Signup successful');
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should handle missing input fields', () => {
      render(<Login />);
      fireEvent.click(screen.getByText('SignUp'));

      expect(handleError).toHaveBeenCalledWith('name - email-password- required');
    });

    test('should handle server error response', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ success: false, error: { details: [{ message: 'Server error' }] } }),
        })
      );

      render(<Login />);
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByText('SignUp'));

      await screen.findByText('SignUp'); // Wait for async actions

      expect(handleError).toHaveBeenCalledWith('Server error');
    });

    test('should handle network error', async () => {
      global.fetch = jest.fn(() => Promise.reject('Network error'));

      render(<Login />);
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByText('SignUp'));

      await screen.findByText('SignUp'); // Wait for async actions

      expect(handleError).toHaveBeenCalledWith('Network error');
    });
  });
});

// End of unit tests for: Login
