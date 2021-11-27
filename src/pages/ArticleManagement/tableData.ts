import { LooseDictionary } from 'quasar/dist/types/ts-helpers';
import { date } from 'quasar';

const { addToDate, formatDate } = date

export type PostStatus = 0 | 1

export interface QColumnProp {
  /**
   * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
   */
  name: string;
  /**
   * Label for header
   */
  label: string;
  /**
   * Row Object property to determine value for this column or function which maps to the required property
   */
  field: string | ((row: LooseDictionary) => any);
  /**
   * If we use visible-columns, this col will always be visible
   */
  required?: boolean;
  /**
   * Horizontal alignment of cells in this column
   * Default value: right
   */
  align?: "left" | "right" | "center";
  /**
   * Tell QTable you want this column sortable
   */
  sortable?: boolean;
  /**
   * Compare function if you have some custom data or want a specific way to compare two rows
   */
  sort?: (
    a: any,
    b: any,
    rowA: LooseDictionary,
    rowB: LooseDictionary
  ) => number;
  /**
   * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
   * Default value: ad
   */
  sortOrder?: "ad" | "da";
  /**
   * Function you can apply to format your data
   */
  format?: (val: any, row: LooseDictionary) => any;
  /**
   * Style to apply on normal cells of the column
   */
  style?: string | ((row: LooseDictionary) => string);
  /**
   * Classes to add on normal cells of the column
   */
  classes?: string | ((row: LooseDictionary) => string);
  /**
   * Style to apply on header cells of the column
   */
  headerStyle?: string;
  /**
   * Classes to add on header cells of the column
   */
  headerClasses?: string;
}

export interface PostProp {
  id: string;
  title: string;
  author: string;
  post_date: string | Date | number;
  last_date: string | Date | number;
  post_status: PostStatus;
  action: string;
}

const defaultSortHandle = (a: any, b: any) => parseInt(a, 10) - parseInt(b, 10)

export const column: QColumnProp[] = [
  {
    name: 'title',
    label: '文章标题',
    align: 'left',
    field: (row) => row.title,
    sortable: true,
    sort: defaultSortHandle
  },
  {
    name: 'author',
    label: '作者',
    align: 'left',
    field: (row): any => row.author,
  },
  {
    name: 'post_date',
    label: '发布时间',
    align: 'left',
    field: row => row.post_date,
    format: (val, row) => {
      const timestamp = (row.post_date as Date).getTime()
      return formatDate(timestamp,  'YYYY年MM月DD日 HH:mm:ss')
    }
  },
  {
    name: 'last_date',
    label: '修改时间',
    align: 'left',
    field: row => row.last_date,
    format: (val, row) => {
      const timestamp = (row.last_date as Date).getTime()
      return formatDate(timestamp,  'YYYY年MM月DD日 HH:mm:ss')
    },
    sortable: true,
    sort: (a, b) => (a as Date).getTime() - (b as Date).getTime()
  },
  {
    name: 'post_status',
    label: '发布状态',
    align: 'left',
    field: row => row.post_status,
  },
  {
    name: 'action',
    label: '操作',
    align: 'left',
    field: row => row.action
  }
]

export const data: PostProp[]  = [
  {
    id: '1',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '2',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '3',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '4',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '5',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '6',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '7',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '8',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '9',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  },
  {
    id: '10',
    title: 'Vue指南',
    author: '自己',
    post_date: addToDate(new Date(), { days: 7, months: 1 }),
    last_date: addToDate(new Date(), { days: 7, months: 1 }),
    post_status: 1,
    action: 'action',
  }
]

