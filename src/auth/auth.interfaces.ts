export type AuthenticatedUser = {
  id: number;
  username: string;
  role: any;
};

export type JwtPayload = {
  sub: number;
  username: string;
  role: any;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
