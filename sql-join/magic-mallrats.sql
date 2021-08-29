    select "firstName",
           "lastName"
      from "customers"
inner join "rentals"
        on "customers"."customerId" = "rentals"."customerId"
inner join "inventory"
        on "inventory"."inventoryId" = "rentals"."inventoryId"
inner join "films"
        on "films"."filmId" = "inventory"."filmId"
     where "title" = 'Magic Mallrats';
