const validation = {
  haveSpecialCharacter: (name: string): boolean => {
      const pattern = /[~,`,!,@,#,$,%,^,&,*,(,),_,-,+,=,{,},[,],|,',",:,;,,,.,?]/
      return pattern.test(name)
   }
}

export  default  validation
