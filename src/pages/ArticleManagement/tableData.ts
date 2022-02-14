import { LooseDictionary } from 'quasar/dist/types/ts-helpers';
import { date } from 'quasar';
import { ABoforeB } from 'src/utils/date'

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
  align?: 'left' | 'right' | 'center';
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
  sortOrder?: 'ad' | 'da';
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
  articleName: string;
  articleStatus: number;
  authorId: number;
  authorName: string;
  category: string;
  content: string;
  creteTime: string | Date | number;
  lastTime: string | Date | number;
  description: string;
  id: number;
}

const defaultSortHandle = (a: any, b: any) => parseInt(a, 10) - parseInt(b, 10)

export const column: QColumnProp[] = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: (row) => row.id,
    sortable: true,
    sort: defaultSortHandle
  },
  {
    name: 'title',
    label: '文章标题',
    align: 'left',
    field: (row) => row.articleName,
    sortable: true,
    sort: defaultSortHandle
  },
  {
    name: 'author',
    label: '作者',
    align: 'left',
    field: (row) => row.authorName,
  },
  {
    name: 'category',
    label: '分类',
    align: 'left',
    field: (row) => row.category,
    format: val => (val as string).replace(',', '、')
  },
  {
    name: 'post_date',
    label: '发布时间',
    align: 'left',
    field: row => row.post_date,
    format: (val, row) => {
      const timestamp = new Date(row.createTime as string)
      return formatDate(timestamp,  'YYYY年MM月DD日 HH:mm:ss')
    },
    sort: (a,b) => ABoforeB(a, b)
  },
  {
    name: 'last_date',
    label: '修改时间',
    align: 'left',
    field: row => row.last_date,
    format: (val, row) => {
      const timestamp = new Date(row.lastTime as string)
      return formatDate(timestamp,  'YYYY年MM月DD日 HH:mm:ss')
    },
    sortable: true,
    sort: (a, b) => ABoforeB(a, b)
  },
  {
    name: 'post_status',
    label: '发布状态',
    align: 'left',
    field: row => row.articleStatus,
    format: (val, row) => {
      return val == 1 ? '已发布' : '草稿'
    }
  },
]

export const data: PostProp[] = []
