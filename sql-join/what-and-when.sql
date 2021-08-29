    select "releaseYear",
           "categories"."name" as "categoryName",
           "title"
      from "films"
inner join "filmCategory"
        on "films"."filmId" = "filmCategory"."filmId"
inner join "categories"
        on "categories"."categoryId" = "filmCategory"."categoryId"
     where "title" = 'Boogie Amelie';
