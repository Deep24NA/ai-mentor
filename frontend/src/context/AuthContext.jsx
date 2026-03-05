import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            localStorage.removeItem('token');
          }
        } catch (e) {
          console.error("Failed to fetch user session", e);
        }
      }
      setIsInitializing(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
        return { success: true };
      }
      return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error. Is the server running?' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
        return { success: true };
      }
      return { success: false, error: data.message || 'Registration failed' };
    } catch (error) {
      return { success: false, error: 'Network error. Is the server running?' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const updateProfile = async (name, email, password) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return { success: true, message: data.message || 'Profile updated successfully' };
      }
      return { success: false, error: data.message || 'Update failed' };
    } catch (error) {
      return { success: false, error: 'Network error. Could not reach server.' };
    }
  };

  // Exposed so HabitContext & ProgressContext can update XP/level reactively
  const updateUser = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser, updateProfile, login, register, logout, loading }}>
      {!isInitializing && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 const res = await fetch('http://localhost:5000/api/auth/me', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 if (res.ok) {
//                     const userData = await res.json();
//                     setUser(userData);
//                 } else {
//                     localStorage.removeItem('token');
//                 }
//             } catch (e) {
//                 console.error("Failed to fetch user session", e);
//             }
//         }
//         setLoading(false);
//     };
//     fetchUser();
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });
        
//         const data = await response.json();
        
//         if (response.ok) {
//              setUser(data);
//              localStorage.setItem('token', data.token);
//              navigate('/dashboard');
//              return { success: true };
//         }
//         return { success: false, error: data.message || 'Login failed' };
//     } catch (error) {
//         return { success: false, error: 'Network error. Is the server running?' };
//     } finally {
//         setLoading(false);
//     }
//   };

//   const register = async (name, email, password) => {
//       setLoading(true);
//       try {
//           const response = await fetch('http://localhost:5000/api/auth/register', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ name, email, password })
//           });
          
//           const data = await response.json();

//           if (response.ok) {
//               setUser(data);
//               localStorage.setItem('token', data.token);
//               navigate('/dashboard');
//               return { success: true };
//           }
//           return { success: false, error: data.message || 'Registration failed' };
//       } catch (error) {
//           return { success: false, error: 'Network error. Is the server running?' };
//       } finally {
//           setLoading(false);
//       }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
