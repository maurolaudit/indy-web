import { format } from 'date-fns';
import Image from 'next/image';
import DummyAvatar from '../public/images/dummy-avatar.png';

const NoteCard = ({
  note,
  createdBy,
  createdAt,
}: {
  note: string
  createdBy: string
  createdAt: Date
}) => (
  <div className="flex items-center rounded-xl bg-white px-6 py-5 shadow">
    <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
    <div className="ml-3 font-urbanist text-sm font-semibold text-onyx">{createdBy}</div>
    <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
    <div className="font-urbanist text-xs font-medium text-lavender-gray">
      {format(createdAt, "yy MM''dd")}
    </div>
  </div>
)

export default NoteCard
