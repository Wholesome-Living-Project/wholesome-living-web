const validateEmail = (email: string) => {
  // Basic email validation check
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export { validateEmail };
