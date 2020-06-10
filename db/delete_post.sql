delete from posts where id = $1;

select
  p.title,
  p.author_id,
  p.id AS post_id,
  u.username AS author,
  u.profile_pic
FROM
  posts p
  JOIN users u ON u.id = p.author_id
ORDER BY
  p.id DESC;