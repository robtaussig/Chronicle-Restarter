json.extract! @saved_project,
  :id, :title, :content, :author_id, :category_id,
  :goal, :duration, :location, :blurb, :risks

json.project_img_urls asset_path(@saved_project.image.url)
json.rewards @saved_project.rewards
json.author @saved_project.author
if @saved_project.image
  json.image @saved_project.image
end
