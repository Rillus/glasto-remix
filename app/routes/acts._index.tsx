import { db } from "~/utils/db.server";
import {Link, useLoaderData} from "@remix-run/react";
import {DateChip} from "~/components/DateChip";
import {StageChip} from "~/components/StageChip";
import urlHelper from "~/helpers/url";

export const loader = async () => {
  const count = await db.act.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const randomAct = await db.act.findMany({
    skip: randomRowNumber,
    take: 1,
    include: {
      location: true
    }
  });

  return {randomAct: randomAct[0]};
}

export default function ActsIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's a random act:</p>
      <p>
        <Link to={urlHelper.safeName(data.randomAct.name)}>{data.randomAct.name}</Link> -
        <DateChip start={data.randomAct.start} end={data.randomAct.end} />
        <StageChip name={data.randomAct.location.name} id={data.randomAct.location.id} />
      </p>
    </div>
  );
}
