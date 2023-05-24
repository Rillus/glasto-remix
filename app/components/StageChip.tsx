import {Link} from "@remix-run/react";
import urlHelper from "~/helpers/url";

export function StageChip(props: { name: string, id: number }) {
  return (
    <span className="StageChip">
      <Link className={"StageChip-name StageChip-name--"+props.id} to={'/stages/'+urlHelper.safeName(props.name)}>{props.name}</Link>
    </span>
  );
}
