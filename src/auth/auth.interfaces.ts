export type AuthenticatedUser = {
  id: number;
  username: string;
  role: any;
  partnerId?: number;
};

export type JwtPayload = {
  sub: number;
  username: string;
  role: any;
  partnerId?: number;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
