    select "line1",
           "cities"."name" as "city",
           "district",
           "countries"."name" as "country"
      from "addresses"
inner join "cities"
        on "cities"."cityId" = "addresses"."cityId"
inner join "countries"
        on "countries"."countryId" = "cities"."countryId";
