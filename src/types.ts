export interface Content {
  updated_at: string;
  created_at: string;
  is_deleted: boolean;
  history: string;
  id: string;
  title: string;
  content_body: string;
  queue: string;
  status: string;
}

export interface Page {
  id: string;
  title: string;
  // Add other page properties as needed
}

export interface QueueFormData {
  queue_index: number;
  approval: boolean;
}
export interface UserData{
  id: number,
  email: string,
  token:string,
  username:  string,
  role_id: number,
  created_at:number
}