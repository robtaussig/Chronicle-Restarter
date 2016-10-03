json.array! @updates do |update|
  json.title update.title
  json.user_id update.user_id
  json.body update.body
  json.campaign_id update.campaign_id
  json.id update.id
  json.email update.author.email
  json.date update.created_at.to_date
end
