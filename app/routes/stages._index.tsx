import { db } from "~/utils/db.server";
import {Link, useLoaderData} from "@remix-run/react";
import urlHelper from "~/helpers/url";
import {StageChip} from "~/components/StageChip";

export const loader = async () => {
  const stages = await db.location.findMany({
    include: {
      Act: true
    }
  });

  return {stages};
}

export default function StagesIndexRoute() {
  const data = useLoaderData<typeof randomStage>();

  console.log(data.randomStage);

  return (
    <div>
      <h1 className="u-text-center">
        Stages
      </h1>
      {data.stages.map((stage) => (
        <div className="StageList" key={stage.id}>
          <StageChip name={stage.name} id={stage.id} />
        </div>
      ))}
    </div>
  );
}
