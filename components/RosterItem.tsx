import Link from 'next/link';
import React from 'react';
import Roster from '../types/roster';

type Props = {
  roster: Roster;
  handleDelete: (id: number) => {};
};

function RosterItem({ roster, handleDelete }: Props) {
  return (
    <div className="grid w-full grid-cols-[3fr_1fr]">
      <Link href={`/roster/${roster.id}`} className="text-blue-500 hover:underline">
        <p key={roster.id}>{roster.description}</p>
      </Link>
      <button
        className="float-right text-right text-red-500 hover:underline"
        onClick={() => {
          handleDelete(roster.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default RosterItem;
