export interface RoomType {
  currentTrack: {
    uri: string;
    isPaused: boolean;
    position: number;
    timestamp: number;
  };
  listeners: number;
  messages: CommentType[];
  moderator: {
    name: string;
  };
  name: string;
  description: string;
  id: string;
  actionType: string;
}

export interface CommentType {
  id: string;
  body: string;
  timestamp: number;
}

export interface RoomInfoType {
  id: string;
  name: string;
  description: string;
  comment: CommentType | null;
  moderator: {
    name: string;
  };
  listeners: number;
  isPaused: boolean;
}

export interface RemoteInitialStateType {
  isRemote: boolean;
  isListener: boolean;
  isModerator: boolean;
  roomInfo: RoomInfoType;
  joinedAt: number | null;
}
