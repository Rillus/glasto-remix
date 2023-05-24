import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const glastoData = require('../public/g2023.json');

async function seed() {
  await Promise.all(
    glastoData.locations.map((location: any) => {
      const locationInDb = db.location.create(
        {
          data: {
            name: location.name
          }
        }
      ).then((locationInDb) => {
        console.log('locationInDb', locationInDb);
        location.events.map((locationEvent: any) => {
          if (locationEvent.name.trim() !== '') {
            const newAct = db.act.create(
              {
                data: {
                  name: locationEvent.name,
                  short: locationEvent.short,
                  start: new Date(locationEvent.start),
                  end: new Date(locationEvent.end),
                  locationId: locationInDb.id,
                }
              }
            ).then((newAct) => {
              console.log('newAct', newAct);
              return newAct;
            });
          }
        });
      });
      return locationInDb;
    })
  );
}

seed().then(() => {
  console.log("seeded");
  db.$disconnect();
});

function getActs() {
  return [
    {
      name: "Gabriels",
      description: `LA-based group (Jacob Lusk, Ari Balouzian & Ryan Hope) whose music is a mix of soul, gospel, 
      and R&B.`,
    },
    {
      name: "Chvrches",
      description: `Glaswegian electronic pop trio (Lauren Mayberry, Iain Cook & Martin Doherty).`,
    },
    {
      name: "Royal Blood",
      description: `Brighton UK two piece rock band (Mike Kerr & Ben Thatcher).`,
    },
    {
      name: "Arctic Monkeys",
      description: `English rock band (Alex Turner, Jamie Cook, Nick O'Malley & Matt Helders).`,
    },
    {
      name: "Young Fathers",
      description: `Young Fathers are a Scottish group formed in Edinburgh, Scotland in 2008.`,
    },
    {
      name: "Kelis",
      description: `American singer-songwriter (Kelis Rogers).`,
    },
    {
      name: "Hot Chip",
      description: `English electronic music band (Alexis Taylor, Joe Goddard, Owen Clarke, Al Doyle & Felix Martin).`,
    },
  ];
}
