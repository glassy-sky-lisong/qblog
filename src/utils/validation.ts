const validation = {
  haveSpecialCharacter: (name: string): boolean => {
    const pattern = /[~,`,!,@,#,$,%,^,&,*,(,),_,-,+,=,{,},|,',",:,;,,,.,?,\],[,\\]/;

    if (pattern.test(name)) return true;

    const pattern1 = /^(select|create|show|drop|update|delete|admin|管理员|系统管理员)/;

    if (pattern1.test(name)) return true;

    return false;
   }
}

export  default  validation
