const validation = {
  haveSpecialCharacter: (name: string): boolean => {
    const pattern = /[~,`,!,@,#,$,%,^,&,*,(,),_,-,+,=,{,},|,',",:,;,,,.,?,\],[,\\]/;

    if (pattern.test(name)) return true;

    const pattern1 = /^(select|create|show|drop|update|delete|admin|管理员|系统管理员)/;

    if (pattern1.test(name)) return true;

    return false;
   },
  isbirthday: (birthday: string): boolean => {
    const pattern = /[1-4][0-9]{3}-[0-1][0-9]-[0-3][0-9]/;
    const strs = birthday.split('-');
    const pattern1 = /(13|14|15|16|17|18|19)/;
    const pattern2 = /(32|33|34|45|46|37|38|39)/;
    const pattern3 = /(-02-30|-02-31|-04-31|-06-31|-09-31|-11-31)/;
    const pattern4 = /(-02-29)/;

    console.log(parseInt(strs[0], 10) % 4);

    if (!pattern.test(birthday) || pattern3.test(birthday)) return false;

    if (pattern1.test(strs[1])) return false;

    if (pattern2.test(strs[2])) return false;

    if (pattern3.test(birthday)) return false;

    if (parseInt(strs[0], 10) % 4 !== 0 && pattern4.test(birthday)) return false;
    return true;
  },
  isEmail: (email: string): boolean => {
    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return pattern.test(email);
  },
  validPassword: (pwd: string): boolean => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,18}$/

    return pattern.test(pwd)
  }
}

export  default  validation
