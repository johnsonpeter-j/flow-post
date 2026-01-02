export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    signin : {
        isLoading: boolean;
        error: string | null;
    },
    signup : {
        isLoading: boolean;
        error: string | null;
    },
    forgotPassword : {
        isLoading: boolean;
        error: string | null;
    },
    resetPassword : {
        isLoading: boolean;
        error: string | null;
    },
    verifyToken : {
        isLoading: boolean;
        error: string | null;
    },
  }