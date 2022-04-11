import { RouteRecordRaw, RouteMeta, RouteComponent } from 'vue-router';
import { Nav } from 'components/SlideGrop/nav';

export type TabMeta = RouteMeta & {
  tab: {
    name: string;
    icon: string;
    label: string;
    show: boolean;
  }
}
export type TabRoute = Exclude<RouteRecordRaw, { 'meta' }> & { meta: TabMeta }
type Lazy<T> = () => Promise<T>;

export interface OptionsProp {
  component: RouteComponent | Lazy<RouteComponent>;
  name: string;
  icon: string;
  path: string;
  label: string;
  show: boolean,
  children?: OptionsProp[]
}

export const lRoutes: TabRoute[] = []

export const rRoutes: TabRoute[] = []

export const initRoutes = (options: OptionsProp[]) => {
  options.map(item => {
    if(item.children && item.children?.length > 0) {
      const template: TabRoute = {
        name: item.name,
        component: () => import('src/layouts/MainLayout.vue'),
        path: item.path,
        children: item.children.map(v => (
          {
            name: v.name,
            component: v.component,
            path: item.path.concat('/', v.path),
            children: [],
            meta: {
              tab: { name: v.name, label: v.label, icon: v.icon, show: v.show }
            }
          }
        )),
        meta: {
          tab: { name: item.name, label: item.label, icon: item.icon, show: item.show }
        }
      }

      lRoutes.push(template)
    } else {
      const template = {
        name: item.name,
        component: item.component,
        path: item.path,
        meta: {
          tab: {
            name: item.name,
            label: item.label,
            icon: item.icon,
            show: item.show
          }
        }
      }

      rRoutes.push(template)
    }
  })
}

export const initNav = (options: OptionsProp[]) => {
  const navs: Nav[] = []
  options.map(item => {
   if (!/:/.test(item.path)) {
      const temp: Nav = {
        name: item.name,
        label: item.label,
        icon: item.icon,
        show: item.show,
        to: item.children ? '' : item.path,
        children: item.children ? item.children.map(v => ({ name: v.name, label: v.label, icon: v.icon, show: v.show, to: item.path.concat('/', v.path), children: [] })) : []
      }

      navs.push(temp)
    }
  })

  return navs
}
