declare module "elasticsearchcase" {
  export type UserObject = {
    _id: string;
    _index: string;
    _score: number;
    _source: User;
  };

  export type User = {
    cell: string;
    dob: Dob;
    email: string;
    gender: string;
    id: Id;
    location: UserLocation;
    login: Login;
    name: Name;
    nat: string;
    phone: string;
    picture: Picture;
    registered: Registered;
  };

  export type Dob = {
    age: number;
    date: string;
  };

  export type Id = {
    name: string;
    value: string;
  };

  export type UserLocation = {
    city: string;
    coordinates: Coordinates;
    country: string;
    postcode: string;
    state: string;
    street: Street;
    timezone: Timezone;
  };

  export type Coordinates = {
    latitude: string;
    longitude: string;
  };

  export type Street = {
    name: string;
    number: number;
  };

  export type Timezone = {
    description: string;
    offset: string;
  };

  export type Login = {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };

  export type Name = {
    title: string;
    first: string;
    last: string;
  };

  export type Picture = {
    large: string;
    medium: string;
    thumbnail: string;
  };

  export type Registered = {
    age: number;
    date: string;
  };

  export type BooleanResponse = {
    success: boolean;
  };

  export type DropDownItemList = {
    key: string;
    label: string;
  }[];
}
