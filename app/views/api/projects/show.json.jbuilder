json.extract! @project,
  :id, :title, :content, :author_id, :category_id, :blurb, :duration,
  :goal, :project_img_urls, :location, :saved_project_id,
  :author_full_name, :risks, :website

  json.rewards @project.rewards
  json.fundings @project.fundings
