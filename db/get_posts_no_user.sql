select
    p.id as post_id,
    p.title,
    p.author_id,
    u.username as author,
    u.profile_pic
from posts p join users u
    on u.id = p.author_id
where 
p.title
ilike '%' || $1 || '%'
order by p.id
desc;