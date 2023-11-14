export interface ProfileType {
  id: number,
  gender: number,
  photo: string,
  address: string,
}

export interface RoleType {
  id: number,
  name: string,
}

export interface UserItem {
  username: string,
  password?: string,
  profile: ProfileType,
  roles: RoleType[]
}
