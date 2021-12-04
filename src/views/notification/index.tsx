import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import { FC } from 'react';

import { apiNotificationList } from '~/api/app-notification/notification.api';
import { NotificationLevelEnum } from '~/config/enum/notification-level.enum';
import { usePagination } from '~/hooks/usePagination';
import { Notification } from '~/interface/app-notification/notification.interface';

import NotificationSearch from './components/notification-search';

const NotificationPage: FC = () => {
  const { tableData, loading } = usePagination({
    apiMethod: apiNotificationList,
    resultListKeyPath: 'NotificationList',
  });

  return (
    <div>
      <NotificationSearch />
      <Table
        rowKey="CreateTime"
        bordered
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={loading}
        scroll={{ x: 1200, y: 500 }}
      />
    </div>
  );
};

export default NotificationPage;

const columns: ColumnProps<Notification>[] = [
  {
    title: '节点',
    width: 'auto',
    dataIndex: 'NodeAddr',
    render: (data, row) => (
      <div>
        <span>{data}</span>
        <span>{row.NodeName}</span>
      </div>
    ),
  },
  {
    title: '应用',
    width: 200,
    dataIndex: 'AppName',
  },
  {
    title: '类型',
    width: 100,
    dataIndex: 'Level',
    render: (data, row) => NotificationLevelEnum[row.Level],
  },
  {
    title: '标题',
    width: 200,
    dataIndex: 'Title',
  },
  {
    title: '时间',
    width: 200,
    dataIndex: 'CreateTime',
    render(data) {
      return moment(data).format('YYYY-MM-DD HH:MM:SS');
    },
  },
];
