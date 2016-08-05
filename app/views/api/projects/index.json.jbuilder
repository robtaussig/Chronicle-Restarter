json.array! @projects do |project|
  json.title project.title
  json.blurb project.blurb
  json.author_id project.author_id
  json.category_id project.category_id
  json.goal project.goal
  json.duration project.duration
  json.location project.location
  json.due_date project.project_due_date
  json.project_imgs project.project_img_urls
end
