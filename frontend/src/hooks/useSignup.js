import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export const useSingup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    //성공하면 여기에 토큰으로 반환되어서 옴
    const data = await response.json();

    //problem
    if (!response.ok) {
      setIsLoading(false)
      setError(data.error)
    }

    //웹 토큰을 브라우저에 저장해서 유저가 다시 브라우저에 들어와도 로그인되어있게 하기. 로컬스토리지에 저장
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      //update the auth context
      dispatch({ type: 'LOGIN', payload: data })
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}