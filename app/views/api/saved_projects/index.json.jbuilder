json.array! @saved_projects do |project|
  json.id project.id
  json.title project.title
  json.content project.content
  json.blurb project.blurb
  json.author_id project.author_id
  json.category_id project.category_id
  json.goal project.goal
  json.duration project.duration
  json.location project.location
  json.risks project.risks
  json.image project.image
  json.author project.author
end
