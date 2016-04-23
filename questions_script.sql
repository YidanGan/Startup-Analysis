/*Q1*what institutions does the core team of startup companies funded in the B round come from?*/
select	cb_degrees.object_id, distinct title,institution 
from	cb_funding_rounds join cb_relationships on cb_funding_rounds.object_id = relationship_object_id 
join	cb_degrees on cb_relationships.person_object_id = cb_degrees.object_id
where	funding_round_code='b';

/*Q2 How many months are there between round A and B funding of companies which are undergoing B round funding?
http://stackoverflow.com/questions/10506731/get-difference-in-years-between-two-dates
http://stackoverflow.com/questions/10576033/mysql-join-same-table
*/
select	a.object_id,floor(datediff(a.updated_at, a.created_at)/12) 
from	cb_funding_rounds b join cb_funding_rounds a on a.object_id=b.object_id
where	a.funding_round_code = 'a' 
and	b.funding_round_code = 'b' 
and	a.object_id = 'c:5';

/*Q3 what is the name of compnies with a background of Stanford (e.i whose worker graduated from Stanford) funded by investors from Stanford?
http://stackoverflow.com/questions/4122193/how-to-search-for-rows-containing-a-substring
*/
select	distinct o.name 
from	cb_investments i join cb_degrees d on d.object_id=investor_object_id 
join	cb_relationships r on i.funded_object_id=r.relationship_object_id 
join	cb_degrees d2 on d2.object_id=r.person_object_id
join	cb_objects o on o.id = r.relationship_object_id
where	d.institution like "%Stanford%" 
and	d2.institution like "%Stanford%";

/*Q4 what are the top 5 degrees earned by founders(or co-founders) whose companies are funded by the investor who invested most in 2007?*/
select	investor_object_id 
from	(select count(*), b.investor_object_id 
from	(select * from cb_investments where extract(year from created_at) = 2007) b 
group by b.investor_object_id order by 1 desc limit 1) a;

select	count(*), degree_type
from	cb_investments i join cb_relationships on funded_object_id = relationship_object_id 
join	cb_degrees on object_id = person_object_id
where	investor_object_id = 'f:17' and extract(year from i.created_at) = 2007 and title like "%founder%"
group by degree_type having degree_type <> '' order by 1 desc limit 5;

