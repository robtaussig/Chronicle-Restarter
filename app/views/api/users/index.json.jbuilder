json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.email user.email
  json.location user.location
  json.website user.website
  json.pic_url asset_path(user.image.url)
  json.biography user.biography
  json.full_name user.full_name
  json.verified user.verified
  json.verification_status user.verification_status
  json.projects user.projects
end
