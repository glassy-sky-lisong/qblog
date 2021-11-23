export interface navProp {
  icon: string;
  label: string;
  to?: string;
}

export interface exNavProp {
  icon: string;
  label: string;
  children: navProp[]
}

const demoData: Array<navProp | exNavProp> = [

]

export default demoData

