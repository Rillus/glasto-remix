import {Link} from "@remix-run/react";
import urlHelper from "~/helpers/url";
import {DateChip} from "~/components/DateChip";
import assert from "assert";
import {ActChip} from "~/components/ActChip";

export function ActGrid(props: { data: any[] }) {
  assert(typeof props.data === 'object', 'Data must be an array')
  return (
    <div className="Grid">
      {props.data.map((act) => (
        <div className="Grid-row" key={act.id}>
            <ActChip name={act.name} id={act.id} />
            <DateChip start={act.start} end={act.end} />
        </div>
      ))}
    </div>
  );
}
