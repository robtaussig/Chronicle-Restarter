json.array! @comments do |comment|
  json.title comment.title
  json.user_id comment.user_id
  json.body comment.body
  json.campaign_id comment.campaign_id
  json.id comment.id
  json.email comment.author.email
end
