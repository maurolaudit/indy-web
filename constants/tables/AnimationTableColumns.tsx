import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import TrashIcon from '../../components/common/Icons/Trash.icon'
import { Animation } from '../../types/Animation.type'
export const AnimationTableColumns: Array<Column<Animation>> = [
  {
    Header: 'Title',
    accessor: 'title',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Category',
    accessor: 'libraryCategoryName',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableSortBy: true,
    Cell: ({ value }) => {
      const { data: session } = useSession()
      const queryClient = useQueryClient()

      const deleteAnimation = async () => {
        const { status } = await axios.delete(`/v1/libraries/${value}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        })

        if (status === 200) {
          queryClient.invalidateQueries('libraries')
        }
      }

      return (
        <button onClick={deleteAnimation}>
          <TrashIcon className="stroke-waterloo" />
        </button>
      )
    },
  },
]
