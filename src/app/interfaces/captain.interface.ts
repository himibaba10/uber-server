type TVehicle = {
  color: String;
  plate: String;
  capacity: Number;
  vehicleType: "car" | "motorcycle" | "auto";
};

type TLocation = {
  lat?: number;
  lng?: number;
};

export type TCaptain = {
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  status: "active" | "inactive";
  vehicle: TVehicle;
  location?: TLocation;
};
