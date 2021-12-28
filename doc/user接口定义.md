## user接口定义

``` js

interface UserProps {
   id: number;
   username: string;
   password: string;
   gender: number;
   birthday: string;
   email: string;
   enabled: boolean;
   accountNonExpired: boolean;
   accountNonLocked: boolean;
   credentialsNonExpired: boolean;
   role: string;
   roleId: int;
   authorities: { authority: string; }[]

}

```
