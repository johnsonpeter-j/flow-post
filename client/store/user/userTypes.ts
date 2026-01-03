export interface User {
  _id: string;
  name: string;
  email: string;
  departmentId: {
    _id: string;
    name: string;
  } | null;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  } | null;
  invitedOn: string | null;
  joinedOn: string | null;
  createdAt: string;
  lastEditedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  departmentId?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  departmentId?: string;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  getUsers: {
    isLoading: boolean;
    error: string | null;
  };
  getUser: {
    isLoading: boolean;
    error: string | null;
  };
  createUser: {
    isLoading: boolean;
    error: string | null;
  };
  updateUser: {
    isLoading: boolean;
    error: string | null;
  };
  deleteUser: {
    isLoading: boolean;
    error: string | null;
  };
}

