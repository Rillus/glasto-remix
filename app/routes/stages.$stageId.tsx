import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import type {Params} from "@remix-run/react";
import { db } from "~/utils/db.server";
import type {ActionFunctionArgs, ParamParseKey} from "@remix-run/router";
import {DateChip} from "~/components/DateChip";
import urlHelper from "~/helpers/url";
import {StageChip} from "~/components/StageChip";

const PathNames = {
  acts: '/acts/:stageId',
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.acts>>;
}

export const loader = async ({params}:Args) => {
  const nameToMatch = params.stageId.replace(/-+/g, ' ');
  const stage = await db.location.findFirst({
    include: {
      Act: {
        orderBy: {
          start: 'asc'
        },
      },
    },
    where: {
      name: {
        contains: nameToMatch
      },
    },
  });

  if (!stage) {
    return json({message: 'Stage not found', status: 404});
  }
  console.log(stage);

  return json({stage});
};

function Grid(props: { data: any[] }) {
  console.log(props.data);
  return (
    <div className="Grid">
      {props.data.map((act) => (
        <div className="Grid-row" key={act.id}>
          <Link to={`/acts/${urlHelper.safeName(act.name)}`}>{act.name}</Link>
          <DateChip start={act.start} end={act.end} />
        </div>
      ))}
    </div>
  );
}

export default function StageRoute() {
  const data = useLoaderData<typeof loader>();

  if (data.status === 404) {
    return (
      <div>
        <h1>Act not found</h1>
        <p>
          <button onClick={() => history.goBack()}>Go back</button>
        </p>
      </div>
    );
  }

  return (
    <div className="main">
      <h1 className="u-text-center">
        <StageChip name={data.stage.name} id={data.stage.id} />
      </h1>
      <p>{data.stage.description}</p>
      <Grid data={data.stage.Act}/>
    </div>
  );
}
