  select "firstName",
         "lastName",
         sum("amount") as "totalAmount"
    from "customers"
    join "payments" using ("customerId")
group by ("firstName", "lastName")
order by "totalAmount" desc;
