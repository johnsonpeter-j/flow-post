export interface Department {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  lastEditedAt: string;
}

export interface CreateDepartmentData {
  name: string;
  description?: string;
}

export interface UpdateDepartmentData {
  name?: string;
  description?: string;
}

export interface DepartmentState {
  departments: Department[];
  selectedDepartment: Department | null;
  getDepartments: {
    isLoading: boolean;
    error: string | null;
  };
  getDepartment: {
    isLoading: boolean;
    error: string | null;
  };
  createDepartment: {
    isLoading: boolean;
    error: string | null;
  };
  updateDepartment: {
    isLoading: boolean;
    error: string | null;
  };
  deleteDepartment: {
    isLoading: boolean;
    error: string | null;
  };
}


