import { format } from 'date-fns'
import Link from 'next/link'
import { Column } from 'react-table'
import { EyeIcon } from '../../components/icons/EyeIcon'
import { Ticket } from '../../types/Ticket.type'

export const StaffTicketsTableColumns: Array<Column<Ticket>> = [
  {
    Header: 'ID',
    accessor: 'id',
    id: 'id',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Client',
    accessor: 'clientName',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Subject',
    accessor: 'subject',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <div className="flex h-6 w-fit items-center space-x-1.5 rounded-lg border border-bright-gray px-2.5">
        <div
          className={`h-1.5 w-1.5 rounded-full ${
            value === 'closed' || value === 'resolved'
              ? 'bg-jungle-green'
              : value === 'new' || value === 'open'
              ? 'bg-bleu-de-france'
              : value === 'pending'
              ? 'bg-waterloo'
              : value === 'on hold'
              ? 'bg-deep-saffron'
              : 'bg-tart-orange'
          }`}
        />
        <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
      </div>
    ),
  },
  {
    Header: 'Created',
    accessor: 'createdAt',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx">
        {format(value, "yy MMM''dd")}
      </div>
    ),
  },
  {
    Header: 'Deadline',
    accessor: 'duedate',
    sortType: 'datetime',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-medium text-onyx">
        {format(value, "yy MMM''dd")}
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'id',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ row: { original: ticket } }) => {
      return (
        <div className="flex space-x-2">
          <Link href={`/ticket/${ticket.id}`}>
            <a className="group">
              <EyeIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
            </a>
          </Link>
        </div>
      )
    },
  },
]
