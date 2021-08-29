    select "firstName",
           "lastName"
      from "actors"
inner join "castMembers"
        on "actors"."actorId" = "castMembers"."actorId"
inner join "films"
        on "films"."filmId" = "castMembers"."filmId"
     where "title" = 'Jersey Sassy';
