export class UserDTO {
  username : string | undefined;
  password : string | undefined;
}

export class UserLoginResponse{
    data : string | undefined;
    isSuccess : boolean | undefined;
}