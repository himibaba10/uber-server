export type TUser = {
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
