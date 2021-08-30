    select "categories"."name" as "movieCategory",
           count("castMembers"."actorId") as "numberOfMovies"
      from "actors"
inner join "castMembers"
        on "actors"."actorId" = "castMembers"."actorId"
inner join "filmCategory"
        on "filmCategory"."filmId" = "castMembers"."filmId"
inner join "categories"
        on "categories"."categoryId" = "filmCategory"."categoryId"
     where "actors"."firstName" = 'Lisa'
       and "actors"."lastName" = 'Monroe'
  group by "categories"."name";
