import { LogsQueryParams } from './logAPI.type';

export type NotificationParams = LogsQueryParams;

export interface INotification {
  from: string;
  to: string;
  type: string;
  message: string;
}

export interface NotificationResponse {
  content: INotification[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}
