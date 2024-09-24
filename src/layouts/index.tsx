import {
  Outlet,
  useNavigate,
  useRouteProps,
  useSelectedRoutes,
} from '@umijs/max';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { memo } from 'react';
import './index.less';

const getMenus = (menus: Record<string, any>[]) => {
  const run = (list: Record<string, any>[]) => {
    const newList = list.filter((item: any) => item.name);

    const result = newList.map(
      (item: Record<string, any>): Record<string, any> => {
        if (item.children) {
          return {
            key: item.id,
            icon: item.icon,
            label: item.name,
            path: item.path,
            children: run(item.children),
          };
        }

        return {
          key: item.id,
          icon: item.icon,
          path: item.path,
          label: item.name,
        };
      },
    );

    return result;
  };

  return run(menus);
};

interface MenuItem {
  key: string;
  children?: MenuItem[];
}

const getCurrentMenu = (
  menus: MenuItem[],
  id: string,
): MenuItem | undefined => {
  for (const item of menus) {
    if (item.key === id) {
      return item;
    }

    if (item.children) {
      const found = getCurrentMenu(item.children, id);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
};

export default memo(() => {
  const routes = useSelectedRoutes();
  const currentRoute = useRouteProps();
  const item = routes.find((route) => route.pathname === '/');
  const menus: any[] = getMenus(item?.route?.children || []);
  const navigate = useNavigate();

  const onSelect = (item: any) => {
    const target: any = getCurrentMenu(menus, item.key);
    target && navigate(target?.path);
  };

  return (
    <Layout className="layout">
      <Sider className="sider">
        <Menu
          onSelect={onSelect}
          defaultSelectedKeys={[currentRoute.id + '']}
          mode="inline"
          items={menus}
        />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
});
