import { useEffect, useState } from 'react';

/**
 * Hook to fetch the OAuth login URL from the server
 * This ensures the URL is always correct regardless of environment variables
 */
export const useLoginUrl = () => {
  const [loginUrl, setLoginUrl] = useState<string>('#');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await fetch('/api/trpc/auth.getOAuthConfig');
        const data = await response.json();
        const url = data.result?.data?.loginUrl;
        if (url) {
          setLoginUrl(url);
        }
      } catch (error) {
        console.error('Failed to fetch login URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginUrl();
  }, []);

  return { loginUrl, loading };
};
